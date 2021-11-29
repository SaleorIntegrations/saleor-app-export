from typing import IO, TYPE_CHECKING, Any, Dict, List, Set, Union

from ...product.models import Product
from ..notifications import send_export_download_link_notification
from .product_headers import get_export_fields_and_headers_info
from .products_data import get_products_data

from ...common.utils.export import (
    get_filename,
    create_file_with_headers,
    save_csv_file_in_export_file,
    parse_input,
    get_queryset_batches,
    append_to_file,
)

if TYPE_CHECKING:
    # flake8: noqa
    from ...common.models import ExportFile


BATCH_SIZE = 10000


def export_products(
    export_file: "ExportFile",
    scope: Dict[str, Union[str, dict]],
    export_info: Dict[str, list],
    file_type: str,
    delimiter: str = ";",
):
    file_name = get_filename("product", file_type)
    queryset = get_product_queryset(scope)

    export_fields, file_headers, data_headers = get_export_fields_and_headers_info(
        export_info
    )

    temporary_file = create_file_with_headers(file_headers, delimiter, file_type)

    export_products_in_batches(
        queryset,
        export_info,
        set(export_fields),
        data_headers,
        delimiter,
        temporary_file,
        file_type,
    )

    save_csv_file_in_export_file(export_file, temporary_file, file_name)
    temporary_file.close()

    send_export_download_link_notification(export_file)


def get_product_queryset(scope: Dict[str, Union[str, dict]]) -> List[Dict[str, Any]]:
    """Get product queryset based on a scope."""

    # FIXME
    # from ...graphql.product.filters import ProductFilter

    # queryset = Product.objects.all()
    # if "ids" in scope:
    #     queryset = Product.objects.filter(pk__in=scope["ids"])
    # elif "filter" in scope:
    #     queryset = ProductFilter(
    #         data=parse_input(scope["filter"]), queryset=queryset
    #     ).qs

    # queryset = queryset.order_by("pk")

    response = "call the core project with filters"
    queryset = "extract a list of dicts from the response"

    return queryset


def export_products_in_batches(
    queryset: List[Dict[str, Any]],
    export_info: Dict[str, list],
    export_fields: Set[str],
    headers: List[str],
    delimiter: str,
    temporary_file: Any,
    file_type: str,
):
    warehouses = export_info.get("warehouses")
    attributes = export_info.get("attributes")
    channels = export_info.get("channels")

    for product_batch in get_queryset_batches(queryset):

        export_data = get_products_data(
            product_batch, export_fields, attributes, warehouses, channels
        )

        append_to_file(export_data, headers, temporary_file, file_type, delimiter)
