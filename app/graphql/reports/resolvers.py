import json
from typing import Optional

from sqlalchemy import func
from sqlalchemy.exc import NoResultFound
from sqlmodel import select

from app.core.export.fetch import (
    fetch_job_by_id,
    fetch_recipients_info,
    fetch_report_by_id,
)
from app.core.export.orders.fetch import fetch_order_columns_info
from app.core.export.products.fetch import fetch_product_columns_info
from app.core.reports.models import ExportObjectTypesEnum, Job, Report
from app.graphql.pagination import MAX_PAGE_SIZE, ConnectionContext, Edge, PageInfo


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


async def resolve_report_recipients(root: Report, info):
    return fetch_recipients_info(root)


async def resolve_job_report(root: Job, info):
    # TODO: use dataloader
    db = info.context["db"]
    return await fetch_report_by_id(db, root.report_id)


async def resolve_reports(root, info, first: int, after: Optional[str] = None):
    db = info.context["db"]
    if first > MAX_PAGE_SIZE:
        raise ValueError(f"Max page size is {MAX_PAGE_SIZE}. Provided: {first}.")
    query = select(Report).order_by(Report.id).limit(first + 1)
    if after:
        query = query.filter(Report.id > ConnectionContext.decode_cursor(after))
    edges = list(await db.exec(query))
    return ConnectionContext(first=first, after=after, edges=edges)


async def resolve_report_edges(root: ConnectionContext, info):
    return [Edge(report) for report in root.edges[: root.first]]


async def resolve_report_page_info(root: ConnectionContext, info):
    return PageInfo(
        has_next=root.has_next(),
        end_cursor=root.end_cursor(),
    )


async def resolve_reports_count(root: ConnectionContext, info):
    db = info.context["db"]
    scalar = await db.exec(select(func.count(Report.id)))
    return scalar.first()
