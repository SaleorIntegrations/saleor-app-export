from sqlalchemy import func
from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession

from app.core.reports.models import ExportFile


async def resolve_reports(db: AsyncSession):
    return await db.exec(select(ExportFile))


async def resolve_reports_count(db: AsyncSession):
    scalar = await db.exec(select(func.count(ExportFile.id)))
    return scalar.first()
