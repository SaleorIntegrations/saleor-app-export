from collections import ChainMap
from typing import Dict, List, Tuple

from . import ProductExportFields


def get_export_fields_and_headers_info(
    export_info: Dict[str, list]
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
    ) = get_object_headers(export_info)

    data_headers = (
        export_fields + attributes_headers + warehouses_headers + channels_headers
    )
    file_headers += attributes_headers + warehouses_headers + channels_headers
    return export_fields, file_headers, data_headers


def get_product_export_fields_and_headers(
    export_info: Dict[str, list]
) -> Tuple[List[str], List[str]]:
    """Get export fields from export info and prepare headers mapping.

    Based on given fields headers from export info, export fields set and
    headers mapping is prepared.
    """
    export_fields = ["id"]
    file_headers = ["id"]

    fields = export_info.get("fields")
    if not fields:
        return export_fields, file_headers

    fields_mapping = dict(
        ChainMap(
            *reversed(
                ProductExportFields.HEADERS_TO_FIELDS_MAPPING.values()
            )  # type: ignore
        )
    )

    for field in fields:
        lookup_field = fields_mapping[field]
        export_fields.append(lookup_field)
        file_headers.append(field)

    return export_fields, file_headers


def get_object_headers(export_info: Dict[str, list]) -> List[str]:
    attribute_ids = export_info.get("attributes")
    warehouse_ids = export_info.get("warehouses")
    channel_ids = export_info.get("channels")

    # TODO use graphql fragments here
    query = "maine query to the core project"
    if attribute_ids:
        query += f"query with the attribute_ids: {attribute_ids}"

    if warehouse_ids:
        query += f"query with the warehouse_ids: {warehouse_ids}"

    if channel_ids:
        query += f"query with the channel_ids: {channel_ids}"

    response = f"Execute the query: {query}"

    attributes_headers = get_attributes_headers(response.get("attributes"))
    warehouses_headers = get_warehoses_headers(response.get("warehouses"))
    channels_headers = get_channels_headers(response.get("channels"))

    return attributes_headers, warehouses_headers, channels_headers


def get_warehoses_headers(warehouses: List[str]) -> List[str]:
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
