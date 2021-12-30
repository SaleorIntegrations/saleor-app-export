from sqlmodel.ext.asyncio.session import AsyncSession

from app.core.export.orders.fetch import fetch_order_columns_info, fetch_orders_response
from app.core.export.orders.headers import get_headers
from app.core.export.orders.parse import parse_orders_response
from app.core.export.tasks import generic_init_export_for_report


async def init_export_for_report(
    db: AsyncSession,
    report_id: int,
):
    """Initialize export for a report with given id."""
    await generic_init_export_for_report(
        db,
        report_id,
        fetch_order_columns_info,
        get_headers,
        fetch_orders_response,
        parse_orders_response,
    )
