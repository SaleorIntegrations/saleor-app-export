from sqlalchemy import func
from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession

from app.core.reports.models import Report


async def resolve_report(root, info, id: int):
    db = info.context["db"]
    result = await db.exec(select(Report).where(Report.id == id))
    return result.one()


async def resolve_reports(db: AsyncSession):
    return await db.exec(select(Report))


async def resolve_reports_count(db: AsyncSession):
    scalar = await db.exec(select(func.count(Report.id)))
    return scalar.first()
