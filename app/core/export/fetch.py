from sqlalchemy.ext.asyncio import AsyncSession
from sqlmodel import select

from app.core.reports.models import Job, Report


async def fetch_report_by_id(db: AsyncSession, pk: int) -> Report:
    result = await db.exec(select(Report).where(Report.id == pk))
    return result.one()


async def fetch_job_by_id(db: AsyncSession, pk: int) -> Job:
    result = await db.exec(select(Job).where(Job.id == pk))
    return result.one()
