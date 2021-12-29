from sqlalchemy.ext.asyncio import AsyncSession
from sqlmodel import select

from app.core.export.executor import execute_query
from app.core.export.products.builder import build_variants_query
from app.core.export.products.fields import ProductSelectedColumnsInfo
from app.core.reports.models import ExportFile, Report


async def fetch_report_by_id(db: AsyncSession, pk: int) -> Report:
    result = await db.exec(select(Report).where(Report.id == pk))
    return result.one()


async def fetch_export_by_id(db: AsyncSession, pk: int) -> ExportFile:
    result = await db.exec(select(ExportFile).where(ExportFile.id == pk))
    return result.one()


def fetch_product_columns_info(report: Report) -> ProductSelectedColumnsInfo:
    print(report.columns)
    return ProductSelectedColumnsInfo(**report.columns)


async def fetch_products_response(
    column_info: ProductSelectedColumnsInfo,
    cursor: str = "",
) -> dict:
    query = await build_variants_query(cursor, column_info.fields)
    response = await execute_query(query)
    return response
