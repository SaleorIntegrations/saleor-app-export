from typing import TYPE_CHECKING, Any, Dict, List, Set, Union
from collections import ChainMap

import structlog
from gql import Client, gql
from saleor_app_base.sdk.saleor import call_authorized

from app.core.common.utils.export import (
    append_to_file,
    create_file_with_headers,
    get_filename,
    get_list_batches,
    parse_input,
    save_csv_file_in_export_file,
)
from app.core.common.utils.sdk.saleor import get_saleor_transport

from ...products.utils.data import get_products_data
from ...products.utils.headers import get_export_fields_and_headers_info

from .. import ProductExportFields

if TYPE_CHECKING:
    # flake8: noqa
    from app.core.reports.models import ExportFile
    from app.graphql.reports.mutations.products import ExportInfoInput

BATCH_SIZE = 10000


logger = structlog.get_logger()


async def export_products(
    export_file: "ExportFile",
    scope: Dict[str, Union[str, dict]],
    export_info: "ExportInfoInput",
    file_type: str,
    delimiter: str = ";",
):
    file_name = get_filename("product", file_type)

    (
        export_fields,
        file_headers,
        data_headers,
    ) = await get_export_fields_and_headers_info(export_info)
    products = await get_products(scope, export_fields)

    temporary_file = create_file_with_headers(file_headers, delimiter, file_type)

    export_products_in_batches(
        products,
        export_info,
        set(export_fields),
        data_headers,
        delimiter,
        temporary_file,
        file_type,
    )

    await save_csv_file_in_export_file(export_file, temporary_file, file_name)
    temporary_file.close()

    # TODO implement notifications
    # send_export_download_link_notification(export_file)


async def get_products(
    scope: Dict[str, Union[str, dict]], export_fields: List[str]
) -> List[Dict[str, Any]]:
    """Get product list based on a scope."""

    transport = await get_saleor_transport()
    client = Client(transport=transport, fetch_schema_from_transport=True)
    products = []
    continue_fetching = True
    fetch_after_num = ""

    # Continue fetching the products until we get all the required ones.
    while continue_fetching:
        response = await fetch_products(client, fetch_after_num, scope, export_fields)
        if response.get("products", []):
            edges = response["products"]["edges"]
            products += edges
            fetch_after_num = response["products"]["pageInfo"]["endCursor"]
        if not response["products"]["pageInfo"]["hasNextPage"]:
            continue_fetching = False

    return products


def get_required_product_fields(export_fields):
    """
    Get required product fields based on the predefined fields.

    Takes into account only those, that were speicfied by the user.

    If the user has specified some extra fields but they aren't included in
    `ProductExportFields`, then they won't be exported.
    """
    query_fields = []
    fields = dict(
        ChainMap(*reversed(ProductExportFields.PRODUCT_FIELDS.values()))  # type: ignore
    )
    for name, field in fields.items():
        if name in export_fields:
            query_fields.append(field)
    return query_fields


async def fetch_products(client, fetch_after_num, scope, export_fields):
    """
    Build the query for fetching products and perform the request.
    """
    # TODO fetch channels from the scope
    # Right now the product query allows to specify just one channel.
    # It would be great to add the ability to specify multiple ones.
    channel = "moto"
    first_object_num = 50

    required_fields = get_required_product_fields(export_fields)
    fields = " ".join(required_fields)
    params_list = [f'channel: "{channel}"', f"first: {first_object_num}"]

    if "ids" in scope:
        query_filter = f"ids: {scope.ids}"
    elif "filter" in scope:
        query_filter = parse_input(scope.filter)
    else:
        query_filter = None

    if query_filter:
        params_list.append(f"filter: {query_filter}")
    if fetch_after_num:
        params_list.append(f'after: "{fetch_after_num}"')
    params = ", ".join(params_list)

    query = f"""
        query {{
            products ({params}) {{
                pageInfo {{
                    endCursor
                    hasNextPage
                }}
                edges {{
                    node {{
                        {fields}
                    }}
                }}
            }}
        }}
    """

    query = gql(query)
    response = await client.execute_async(query)

    return response


def export_products_in_batches(
    products: List[Dict[str, Any]],
    export_info: "ExportInfoInput",
    export_fields: Set[str],
    headers: List[str],
    delimiter: str,
    temporary_file: Any,
    file_type: str,
):
    warehouses = export_info.warehouses
    attributes = export_info.attributes
    channels = export_info.channels

    for product_batch in get_list_batches(products):

        export_data = get_products_data(
            product_batch, export_fields, attributes, warehouses, channels
        )

        append_to_file(export_data, headers, temporary_file, file_type, delimiter)
