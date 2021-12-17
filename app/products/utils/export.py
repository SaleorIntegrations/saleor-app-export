from typing import IO, TYPE_CHECKING, Any, Dict, List, Set, Union

from gql.dsl import DSLQuery, dsl_gql, DSLSchema
from gql import Client
import structlog

from ...products.utils.headers import get_export_fields_and_headers_info
from ...products.utils.data import get_products_data
from ...common.notifications import send_export_download_link_notification
from ...common.utils.sdk.saleor import get_saleor_transport
from ...common.utils.export import (
    get_filename,
    create_file_with_headers,
    save_csv_file_in_export_file,
    parse_input,
    get_list_batches,
    append_to_file,
)

if TYPE_CHECKING:
    # flake8: noqa
    from ...common.models import ExportFile


BATCH_SIZE = 10000


logger = structlog.get_logger()


async def export_products(
    export_file: "ExportFile",
    scope: Dict[str, Union[str, dict]],
    export_info: Dict[str, list],
    file_type: str,
    delimiter: str = ";",
):
    file_name = get_filename("product", file_type)

    (
        export_fields,
        file_headers,
        data_headers,
    ) = await get_export_fields_and_headers_info(export_info)

    products = await get_products(scope)

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

    save_csv_file_in_export_file(export_file, temporary_file, file_name)
    temporary_file.close()

    # TODO get back after the demo
    # send_export_download_link_notification(export_file)


async def get_products(scope: Dict[str, Union[str, dict]]) -> List[Dict[str, Any]]:
    """Get product list based on a scope."""

    transport = await get_saleor_transport()
    client = Client(transport=transport, fetch_schema_from_transport=True)
    products = []
    continue_fetching = True
    fetch_after_num = 0
    async with client as session:
        ds = DSLSchema(client.schema)
        while continue_fetching:
            response = await fetch_products(ds, fetch_after_num, scope, session)
            if response.get("products", []):
                edges = response["products"]["edges"]
                products += edges
                fetch_after_num += len(edges)
            else:
                continue_fetching = False

    return products


def get_required_fields(ds):
    return [
        "id",
        "name",
        "weight",
        "variants",
        "description",
    ]


async def fetch_products(ds, fetch_after_num, scope, session):
    # TODO make the channel dynamic
    channel = "moto"
    first_object_num = 50

    if "ids" in scope:
        query = ds.Query.products(
            filter={"id": {"in": scope["ids"]}},
            first=first_object_num,
            channel=channel,
            after=fetch_after_num,
        )
    elif "filter" in scope:
        # FIXME Add a proper filter
        query = ds.Query.products(
            filter=parse_input(scope["filter"]),
            first=first_object_num,
            channel=channel,
            after=fetch_after_num,
        )
    else:
        query = ds.Query.products(
            first=first_object_num, channel=channel, after=fetch_after_num
        )

    dsl_query = dsl_gql(
        DSLQuery(
            query.select(
                ds.ProductCountableConnection.edges.select(
                    ds.ProductCountableEdge.node.select(
                        ds.Product.id,
                        ds.Product.name,
                        ds.Product.weight.select(ds.Weight.value),
                        ds.Product.variants.select(
                            ds.ProductVariant.weight.select(ds.Weight.value)
                        ),
                        ds.Product.description,
                    )
                )
            )
        )
    )
    response = await session.execute(dsl_query)
    return response


def export_products_in_batches(
    products: List[Dict[str, Any]],
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

    for product_batch in get_list_batches(products):

        export_data = get_products_data(
            product_batch, export_fields, attributes, warehouses, channels
        )

        append_to_file(export_data, headers, temporary_file, file_type, delimiter)
