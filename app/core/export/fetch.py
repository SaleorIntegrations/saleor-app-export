from sqlalchemy.ext.asyncio import AsyncSession
from sqlmodel import select

from app.core.reports.models import ExportFile, Report


async def fetch_report_by_id(db: AsyncSession, pk: int) -> Report:
    result = await db.exec(select(Report).where(Report.id == pk))
    return result.one()


async def fetch_export_by_id(db: AsyncSession, pk: int) -> ExportFile:
    result = await db.exec(select(ExportFile).where(ExportFile.id == pk))
    return result.one()
