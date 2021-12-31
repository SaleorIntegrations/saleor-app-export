import os
from unittest import mock

import pytest
from sqlmodel import select

from app.core.export.orders.tasks import OrderExportMethods
from app.core.export.tasks import continue_export, init_export_for_report
from app.core.reports.models import ExportFile


@pytest.mark.asyncio
@mock.patch("app.core.export.tasks.continue_export")
@mock.patch.object(OrderExportMethods, "get_headers")
async def test_init_export_for_report(m_headers, m_continue, db_session, orders_report):
    # given
    m_headers.return_value = ["a", "b", "c"]

    # when
    await init_export_for_report(db_session, orders_report.id)

    # then
    export = (
        await db_session.exec(
            select(ExportFile).where(ExportFile.report_id == orders_report.id)
        )
    ).one()
    assert export.cursor == ""
    assert export.content_file.startswith(f"media/{orders_report.id}-")
    assert os.path.isfile(export.content_file)
    with open(export.content_file) as f:
        assert len(f.readlines()) == 1
    m_continue.assert_awaited_once_with(mock.ANY, export.id)


@pytest.mark.asyncio
@mock.patch.object(OrderExportMethods, "fetch_response")
@mock.patch("app.core.export.tasks._continue_export")
async def test_continue_export_with_empty_cursor(
    m_continue,
    m_fetch_response,
    dummy_orders_response_has_no_next,
    db_session,
    orders_export,
):
    # given
    m_fetch_response.return_value = dummy_orders_response_has_no_next

    # when
    await continue_export(db_session, orders_export.id)

    # then
    assert m_continue.call_count == 0


@pytest.mark.asyncio
@mock.patch.object(OrderExportMethods, "fetch_response")
@mock.patch("app.core.export.tasks._continue_export")
async def test_continue_export_with_next_page(
    m_continue,
    m_fetch_response,
    dummy_orders_response_has_next,
    db_session,
    orders_export,
):
    # given
    m_fetch_response.return_value = dummy_orders_response_has_next

    # when
    await continue_export(db_session, orders_export.id)

    # then
    refreshed_export = (
        await db_session.exec(
            select(ExportFile).where(ExportFile.id == orders_export.id)
        )
    ).one()
    assert m_continue.call_count == 1
    assert refreshed_export.cursor != ""
