import pytest

from app.core.export.fetch import fetch_job_by_id
from app.core.export.persist import create_job, update_job_cursor


@pytest.mark.asyncio
async def test_create_job(orders_report, db_session, x_saleor_domain):
    # given
    report = orders_report

    # when
    job = await create_job(db_session, report.id)

    # then
    refreshed_job = await fetch_job_by_id(db_session, job.id, x_saleor_domain)
    assert refreshed_job.cursor == ""
    assert refreshed_job.content_file.startswith(f"media/{report.id}-")


@pytest.mark.asyncio
async def test_update_job_cursor(export_orders_job, db_session, x_saleor_domain):
    # given
    job = export_orders_job
    cursor = "next cursor"

    # when
    await update_job_cursor(db_session, job, cursor)

    # then
    refreshed_job = await fetch_job_by_id(db_session, job.id, x_saleor_domain)
    assert refreshed_job.cursor == cursor
