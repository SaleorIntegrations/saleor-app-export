from app.core.export.executor import execute_query
from app.core.export.orders.builder import build_orders_query
from app.core.export.orders.fields import OrderSelectedColumnsInfo
from app.core.reports.models import Report


def fetch_order_columns_info(report: Report) -> OrderSelectedColumnsInfo:
    return OrderSelectedColumnsInfo(**report.columns)


async def fetch_orders_response(
    column_info: OrderSelectedColumnsInfo,
    cursor: str = "",
    filter: dict = None,
) -> dict:
    prepared_query = build_orders_query(cursor, column_info.fields, filter)
    response = await execute_query(
        prepared_query.query_str,
        prepared_query.variable_values,
    )
    return response
