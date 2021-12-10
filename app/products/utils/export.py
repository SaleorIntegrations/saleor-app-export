from typing import IO, TYPE_CHECKING, Any, Dict, List, Set, Union

from gql.dsl import DSLQuery, dsl_gql

from ...products.utils.headers import get_export_fields_and_headers_info
from ...products.utils.data import get_products_data
from ...common.notifications import send_export_download_link_notification
from ...common.utils.sdk.saleor import SaleorDSLClient
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


async def export_products(
    export_file: "ExportFile",
    scope: Dict[str, Union[str, dict]],
    export_info: Dict[str, list],
    file_type: str,
    delimiter: str = ";",
):
    file_name = get_filename("product", file_type)
    queryset = await get_product_queryset(scope)

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


async def get_product_queryset(
    scope: Dict[str, Union[str, dict]]
) -> List[Dict[str, Any]]:
    """Get product list based on a scope."""

    client = SaleorDSLClient()
    ds = client.get_ds()

    if "ids" in scope:
        query = ds.Query.products(filter={"id": {"in": scope["ids"]}})
    elif "filter" in scope:
        # FIXME Add a proper filter
        query = ds.Query.products(filter=parse_input(scope["filter"]))
    else:
        query = ds.Query.products()

    dsl_query = dsl_gql(DSLQuery(query))
    response = await client.execute(dsl_query)

    # TODO sort by pk
    return response.get("products")


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
