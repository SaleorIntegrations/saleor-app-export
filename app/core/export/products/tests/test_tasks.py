import os
from unittest import mock

import pytest
from sqlmodel import select

from app.core.export.products.tasks import ProductExportMethods
from app.core.export.tasks import continue_export, init_export_for_report
from app.core.reports.models import ExportFile


@pytest.mark.asyncio
@mock.patch("app.core.export.tasks.continue_export")
@mock.patch.object(ProductExportMethods, "get_headers")
async def test_init_export_for_report(m_headers, m_continue, db_session, report):
    # given
    m_headers.return_value = ["a", "b", "c"]

    # when
    await init_export_for_report(db_session, report.id, ProductExportMethods)

    # then
    export = (
        await db_session.exec(
            select(ExportFile).where(ExportFile.report_id == report.id)
        )
    ).one()
    assert export.cursor == ""
    assert export.content_file.startswith(f"media/{report.id}-")
    assert os.path.isfile(export.content_file)
    with open(export.content_file) as f:
        assert len(f.readlines()) == 1
    m_continue.assert_awaited_once_with(mock.ANY, export.id, ProductExportMethods)


@pytest.mark.asyncio
@mock.patch.object(ProductExportMethods, "fetch_response")
@mock.patch("app.core.export.tasks._continue_export")
async def test_continue_export_with_empty_cursor(
    m_continue,
    m_fetch_response,
    dummy_variants_response_has_no_next,
    db_session,
    export,
):
    # given
    m_fetch_response.return_value = dummy_variants_response_has_no_next

    # when
    await continue_export(db_session, export.id, ProductExportMethods)

    # then
    assert m_continue.call_count == 0


@pytest.mark.asyncio
@mock.patch.object(ProductExportMethods, "fetch_response")
@mock.patch("app.core.export.tasks._continue_export")
async def test_continue_export_with_next_page(
    m_continue,
    m_fetch_response,
    dummy_variants_response_has_next,
    db_session,
    export,
):
    # given
    m_fetch_response.return_value = dummy_variants_response_has_next

    # when
    await continue_export(db_session, export.id, ProductExportMethods)

    # then
    refreshed_export = (
        await db_session.exec(select(ExportFile).where(ExportFile.id == export.id))
    ).one()
    assert m_continue.call_count == 1
    assert refreshed_export.cursor != ""
