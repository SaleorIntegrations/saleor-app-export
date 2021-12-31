from app.core.export.orders.fetch import fetch_order_columns_info, fetch_orders_response
from app.core.export.orders.headers import get_headers
from app.core.export.orders.parse import parse_orders_response
from app.core.export.tasks import ExportMethods

OrderExportMethods = ExportMethods(
    fetch_column_info=fetch_order_columns_info,
    get_headers=get_headers,
    fetch_response=fetch_orders_response,
    parse_response=parse_orders_response,
)
