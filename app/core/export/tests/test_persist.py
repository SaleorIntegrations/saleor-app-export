import pytest

from app.core.export.persist import create_job


@pytest.mark.asyncio
async def test_create_job(orders_report, db_session):
    # given
    report = orders_report

    # when
    job = await create_job(db_session, report.id)

    # then
    assert job.id
    assert job.cursor == ""
    assert job.content_file.startswith(f"media/{report.id}-")
