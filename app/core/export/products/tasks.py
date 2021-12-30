from sqlmodel.ext.asyncio.session import AsyncSession

from app.core.export.products.fetch import (
    fetch_product_columns_info,
    fetch_variants_response,
)
from app.core.export.products.headers import get_headers
from app.core.export.products.parse import parse_variants_response
from app.core.export.tasks import generic_init_export_for_report


async def init_export_for_report(
    db: AsyncSession,
    report_id: int,
):
    """Initialize export for a report with given id."""
    await generic_init_export_for_report(
        db,
        report_id,
        fetch_product_columns_info,
        get_headers,
        fetch_variants_response,
        parse_variants_response,
    )
