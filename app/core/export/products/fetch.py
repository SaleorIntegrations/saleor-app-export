import dataclasses
from typing import Dict

from app.core.export.executor import execute_query
from app.core.export.products.builder import build_headers_query, build_products_query
from app.core.export.products.fields import ProductSelectedColumnsInfo
from app.core.reports.models import Report


@dataclasses.dataclass
class NameByIdMapping:
    attributes: Dict[str, str]
    channels: Dict[str, str]
    warehouses: Dict[str, str]


def fetch_product_columns_info(report: Report) -> ProductSelectedColumnsInfo:
    return ProductSelectedColumnsInfo(**report.columns)


async def fetch_products_response(
    column_info: ProductSelectedColumnsInfo,
    cursor: str = "",
    filter: dict = None,
) -> dict:
    prepared_query = build_products_query(cursor, column_info, filter)
    response = await execute_query(
        prepared_query.query_str,
        prepared_query.variable_values,
    )
    return response


async def fetch_header_mappings(
    column_info: ProductSelectedColumnsInfo,
) -> NameByIdMapping:
    # Fetch results from API
    query = await build_headers_query(column_info)
    response = await execute_query(query)

    # Prepare mapping for attributes
    attributes_mapping = {}
    for edge in response["attributes"]["edges"]:
        attribute = edge["node"]
        attributes_mapping[attribute["id"]] = attribute["name"]

    # Prepare mapping for channels
    channels_mapping = {}
    for channel in response["channels"]:
        channels_mapping[channel["id"]] = channel["name"]

    # Prepare mapping for warehouses
    warehouses_mapping = {}
    for edge in response["warehouses"]["edges"]:
        warehouse = edge["node"]
        warehouses_mapping[warehouse["id"]] = warehouse["name"]

    # Fall back to id when not found
    for ids, mapping in (
        (column_info.attributes, attributes_mapping),
        (column_info.channels, channels_mapping),
        (column_info.warehouses, warehouses_mapping),
    ):
        for id in ids:
            if id not in mapping:
                mapping[id] = id

    return NameByIdMapping(
        attributes=attributes_mapping,
        channels=channels_mapping,
        warehouses=warehouses_mapping,
    )
