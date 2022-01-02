import json

from sqlalchemy import func
from sqlalchemy.exc import NoResultFound
from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession

from app.core.export.fetch import fetch_job_by_id, fetch_report_by_id
from app.core.export.orders.fetch import fetch_order_columns_info
from app.core.export.products.fetch import fetch_product_columns_info
from app.core.reports.models import ExportObjectTypesEnum, Job, Report


async def resolve_report(root, info, id: int):
    db = info.context["db"]
    try:
        return await fetch_report_by_id(db, id)
    except NoResultFound:
        return None


async def resolve_job(root, info, id: int):
    db = info.context["db"]
    try:
        return await fetch_job_by_id(db, id)
    except NoResultFound:
        return None


async def resolve_report_filter(root: Report, info):
    return json.dumps(root.filter_input) if root.filter_input else None


async def resolve_report_columns(root: Report, info):
    if root.type == ExportObjectTypesEnum.ORDERS:
        return fetch_order_columns_info(root)
    if root.type == ExportObjectTypesEnum.PRODUCTS:
        return fetch_product_columns_info(root)


async def resolve_job_report(root: Job, info):
    # TODO: use dataloader
    db = info.context["db"]
    return await fetch_report_by_id(db, root.report_id)


async def resolve_reports(db: AsyncSession):
    return await db.exec(select(Report))


async def resolve_reports_count(db: AsyncSession):
    scalar = await db.exec(select(func.count(Report.id)))
    return scalar.first()
