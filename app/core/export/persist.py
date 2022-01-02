from uuid import uuid4

from sqlmodel.ext.asyncio.session import AsyncSession

from app.core.reports.models import Job


def create_job(
    db: AsyncSession,
    report_id: int,
) -> Job:
    """Create export file and create a temporary result file"""
    # Create a temporary file to keep partial results
    path = f"media/{report_id}-{uuid4()}.csv"  # TODO: use mounted volume
    # Create an export instance with an empty cursor
    job = Job(
        report_id=report_id,
        message="",
        cursor="",
        content_file=path,
    )
    db.add(job)
    return job


def update_job_cursor(
    db: AsyncSession,
    job: Job,
    cursor: str,
):
    """Update cursor of the provided export job"""
    job.cursor = cursor
    db.add(job)
