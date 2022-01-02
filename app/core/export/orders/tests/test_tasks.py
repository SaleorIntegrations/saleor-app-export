import os
from unittest import mock

import pytest
from sqlmodel import select

from app.core.export.orders.tasks import OrderExportMethods
from app.core.export.tasks import continue_job, start_job_for_report
from app.core.reports.models import Job


@pytest.mark.asyncio
@mock.patch("app.core.export.tasks.continue_job")
@mock.patch.object(OrderExportMethods, "get_headers")
async def test_start_job_for_report(m_headers, m_continue, db_session, orders_report):
    # given
    m_headers.return_value = ["a", "b", "c"]

    # when
    await start_job_for_report.inner(db_session, orders_report.id)

    # then
    export = (
        await db_session.exec(select(Job).where(Job.report_id == orders_report.id))
    ).one()
    assert export.cursor == ""
    assert export.content_file.startswith(f"media/{orders_report.id}-")
    assert os.path.isfile(export.content_file)
    with open(export.content_file) as f:
        assert len(f.readlines()) == 1
    m_continue.delay.assert_called_once_with(export.id)


@pytest.mark.asyncio
@mock.patch.object(OrderExportMethods, "fetch_response")
@mock.patch("app.core.export.tasks._continue_job")
async def test_continue_job_with_empty_cursor(
    m_continue,
    m_fetch_response,
    dummy_orders_response_has_no_next,
    db_session,
    export_orders_job,
):
    # given
    m_fetch_response.return_value = dummy_orders_response_has_no_next

    # when
    await continue_job.inner(db_session, export_orders_job.id)

    # then
    assert m_continue.call_count == 0


@pytest.mark.asyncio
@mock.patch.object(OrderExportMethods, "fetch_response")
@mock.patch("app.core.export.tasks._continue_job")
async def test_continue_job_with_next_page(
    m_continue,
    m_fetch_response,
    dummy_orders_response_has_next,
    db_session,
    export_orders_job,
):
    # given
    m_fetch_response.return_value = dummy_orders_response_has_next

    # when
    await continue_job.inner(db_session, export_orders_job.id)

    # then
    refreshed_export = (
        await db_session.exec(select(Job).where(Job.id == export_orders_job.id))
    ).one()
    assert m_continue.call_count == 1
    assert refreshed_export.cursor != ""
