import os
from unittest import mock

import pytest
from sqlmodel import select

from app.core.export.products.tasks import ProductExportMethods
from app.core.export.tasks import continue_job, start_job_for_report
from app.core.reports.models import Job


@pytest.mark.asyncio
@mock.patch("app.core.export.tasks.continue_job")
@mock.patch.object(ProductExportMethods, "get_headers")
async def test_start_job_for_report(
    m_headers, m_continue, db_session, export_products_job
):
    # given
    job = export_products_job
    m_headers.return_value = ["a", "b", "c"]

    # when
    await start_job_for_report.inner(db_session, job.id)

    # then
    assert os.path.isfile(job.content_file)
    with open(job.content_file) as f:
        assert len(f.readlines()) == 1
    m_continue.delay.assert_called_once_with(job.id)


@pytest.mark.asyncio
@mock.patch.object(ProductExportMethods, "fetch_response")
@mock.patch("app.core.export.tasks._continue_job")
async def test_continue_job_with_empty_cursor(
    m_continue,
    m_fetch_response,
    dummy_variants_response_has_no_next,
    db_session,
    export_products_job,
):
    # given
    m_fetch_response.return_value = dummy_variants_response_has_no_next

    # when
    await continue_job.inner(db_session, export_products_job.id)

    # then
    assert m_continue.call_count == 0


@pytest.mark.asyncio
@mock.patch.object(ProductExportMethods, "fetch_response")
@mock.patch("app.core.export.tasks._continue_job")
async def test_continue_job_with_next_page(
    m_continue,
    m_fetch_response,
    dummy_variants_response_has_next,
    db_session,
    export_products_job,
):
    # given
    m_fetch_response.return_value = dummy_variants_response_has_next

    # when
    await continue_job.inner(db_session, export_products_job.id)

    # then
    refreshed_job = (
        await db_session.exec(select(Job).where(Job.id == export_products_job.id))
    ).one()
    assert m_continue.call_count == 1
    assert refreshed_job.cursor != ""
