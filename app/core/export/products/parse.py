from typing import List

from app.core.export.products.fields import ProductFieldEnum, ProductSelectedColumnsInfo


def parse_variants_response(
    column_info: ProductSelectedColumnsInfo,
    response: dict,
) -> List[str]:
    """Get headers for both static and dynamic fields"""
    row = parse_static_fields(column_info.fields, response)

    for attribute in column_info.attributes:
        row.extend(parse_attribute_fields(attribute, response))

    for channel in column_info.channels:
        row.extend(parse_channel_fields(channel, response))

    for warehouse in column_info.warehouses:
        row.extend(parse_warehouse_fields(warehouse, response))

    return row


def parse_static_fields(fields: List[ProductFieldEnum], response: dict):
    print(response)
    return []


def parse_attribute_fields(attribute: str, response: dict):
    return []


def parse_channel_fields(channel: str, response: dict):
    return []


def parse_warehouse_fields(warehouse: str, response: dict):
    return []
