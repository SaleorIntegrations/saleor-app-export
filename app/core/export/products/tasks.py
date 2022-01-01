from app.core.export.products.fetch import (
    fetch_product_columns_info,
    fetch_products_response,
)
from app.core.export.products.headers import get_headers
from app.core.export.products.parse import parse_products_response
from app.core.export.tasks import ExportMethods

ProductExportMethods = ExportMethods(
    fetch_column_info=fetch_product_columns_info,
    get_headers=get_headers,
    fetch_response=fetch_products_response,
    parse_response=parse_products_response,
)
