from sqlalchemy import func
from sqlalchemy.exc import NoResultFound
from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession

from app.core.export.fetch import fetch_report_by_id
from app.core.reports.models import Report


async def resolve_report(root, info, id: int):
    db = info.context["db"]
    try:
        return await fetch_report_by_id(db, id)
    except NoResultFound:
        return None


async def resolve_reports(db: AsyncSession):
    return await db.exec(select(Report))


async def resolve_reports_count(db: AsyncSession):
    scalar = await db.exec(select(func.count(Report.id)))
    return scalar.first()
