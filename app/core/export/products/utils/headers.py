from collections import ChainMap
from typing import Dict, List, Tuple, TYPE_CHECKING

from gql import Client
from gql.dsl import DSLQuery, DSLSchema, dsl_gql

from app.core.common.utils.sdk.saleor import get_saleor_transport

from .. import ProductExportFields

if TYPE_CHECKING:
    # flake8: noqa
    from app.graphql.reports.mutations.products import ExportInfoInput


async def get_export_fields_and_headers_info(
    export_info: "ExportInfoInput",
) -> Tuple[List[str], List[str], List[str]]:
    """Get export fields, all headers and headers mapping.

    Based on export_info returns exported fields, fields to headers mapping and
    all headers.
    Headers contains product, variant, attribute and warehouse headers.
    """
    export_fields, file_headers = get_product_export_fields_and_headers(export_info)

    (
        attributes_headers,
        warehouses_headers,
        channels_headers,
    ) = await get_object_headers(export_info)

    data_headers = (
        export_fields + attributes_headers + warehouses_headers + channels_headers
    )
    file_headers += attributes_headers + warehouses_headers + channels_headers
    return export_fields, file_headers, data_headers


def get_product_export_fields_and_headers(
    export_info: "ExportInfoInput",
) -> Tuple[List[str], List[str]]:
    """Get export fields from export info and prepare headers mapping.

    Based on given fields headers from export info, export fields set and
    headers mapping is prepared.
    """
    export_fields = ["id"]
    file_headers = ["id"]

    fields = export_info.fields
    if not fields:
        return export_fields, file_headers

    fields_mapping = dict(
        ChainMap(*reversed(ProductExportFields.ALT_PRODUCT_FIELDS.values()))  # type: ignore
    )
    for field in fields:
        # lookup_field = fields_mapping[field]
        export_fields.append(field)
        file_headers.append(field.replace("_", " ").title())

    return export_fields, file_headers


async def get_object_headers(
    export_info: "ExportInfoInput",
) -> Tuple[List[str], List[str], List[str]]:
    attribute_ids = export_info.attributes
    warehouse_ids = export_info.warehouses
    channel_ids = export_info.channels

    # There is no reason to proceed if the ids weren't provided.
    if not attribute_ids and not warehouse_ids and not channel_ids:
        return [], [], []

    transport = await get_saleor_transport()
    client = Client(transport=transport, fetch_schema_from_transport=True)

    async with client as session:
        ds = DSLSchema(client.schema)
        queries = []

        if attribute_ids:
            attributes_query = ds.Query.attributes(filter={"id": {"in": attribute_ids}})
            queries.append(attributes_query)
        if warehouse_ids:
            warehouses_query = ds.Query.warehouses(filter={"id": {"in": warehouse_ids}})
            queries.append(warehouses_query)
        if channel_ids:
            channels_query = ds.Query.channels(filter={"id": {"in": channel_ids}})
            queries.append(channels_query)

        dsl_query = dsl_gql(DSLQuery(*queries))
        response = await session.execute(dsl_query)

        attributes_headers = get_attributes_headers(response.get("attributes"))
        warehouses_headers = get_warehoses_headers(response.get("warehouses"))
        channels_headers = get_channels_headers(response.get("channels"))

    return attributes_headers, warehouses_headers, channels_headers


def get_warehoses_headers(warehouses: List[dict]) -> List[str]:
    """Get headers for exported warehouses.

    Headers are build from slug. Example: "slug-value (warehouse quantity)"
    """
    warehouses_slugs = [item.get("slug") for item in warehouses].sort()
    warehouses_headers = [f"{slug} (warehouse quantity)" for slug in warehouses_slugs]

    return list(warehouses_headers)


def get_attributes_headers(attributes: List[str]) -> List[str]:
    """Get headers for exported attributes.

    Headers are build from slug and contains information if it's a product or variant
    attribute. Respectively for product: "slug-value (product attribute)"
    and for variant: "slug-value (variant attribute)".
    """

    # TODO here we either should filter attributes
    # or we should get them separately right away when doing the query
    products_attrs = []
    variants_attrs = []

    products_slugs = [item.get("slug") for item in products_attrs].sort()
    variants_slugs = [item.get("slug") for item in variants_attrs].sort()

    products_headers = [f"{slug} (product attribute)" for slug in products_slugs]
    variants_headers = [f"{slug} (variant attribute)" for slug in variants_slugs]

    return products_headers + variants_headers


def get_channels_headers(channels: List[str]) -> List[str]:
    """Get headers for exported channels.

    Headers are build from slug and exported field.

    Example:
    - currency code data header: "slug-value (channel currency code)"
    - published data header: "slug-value (channel visible)"
    - publication date data header: "slug-value (channel publication date)"

    """
    fields = [
        *ProductExportFields.PRODUCT_CHANNEL_LISTING_FIELDS.keys(),
        *ProductExportFields.VARIANT_CHANNEL_LISTING_FIELDS.keys(),
    ]
    channels_slugs = [item.get("slug") for item in channels].sort()
    channels_headers = []
    for slug in channels_slugs:
        channels_headers.extend(
            [
                f"{slug} (channel {field.replace('_', ' ')})"
                for field in fields
                if field not in ["slug", "channel_pk"]
            ]
        )

    return list(channels_headers)
