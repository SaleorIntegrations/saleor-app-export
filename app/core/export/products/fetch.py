from typing import List

from sqlalchemy.ext.asyncio import AsyncSession
from sqlmodel import select

from app.core.export.executor import execute_query
from app.core.export.products.builder import build_variants_query
from app.core.export.products.fields import ProductFieldEnum
from app.core.reports.models import ExportFile, Report


async def fetch_report_by_id(db: AsyncSession, pk: int) -> Report:
    result = await db.exec(select(Report).where(Report.id == pk))
    return result.one()


async def fetch_export_by_id(db: AsyncSession, pk: int) -> ExportFile:
    result = await db.exec(select(ExportFile).where(ExportFile.id == pk))
    return result.one()


async def fetch_products_response(
    export_fields: List[ProductFieldEnum],
    cursor: str = "",
) -> dict:
    cursor = ""
    query = await build_variants_query(cursor, export_fields)
    response = await execute_query(query)
    return response
