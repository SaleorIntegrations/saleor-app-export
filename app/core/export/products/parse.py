from typing import List, Tuple

from app.core.export.products.fields import ProductFieldEnum, ProductSelectedColumnsInfo


def parse_variants_response(
    column_info: ProductSelectedColumnsInfo,
    response: dict,
) -> Tuple[List[List[str]], str]:
    """Get headers for both static and dynamic fields"""
    # Prepare cursor information
    rows = []
    data = response["data"]
    variants = data["productVariants"]
    page_info = variants["pageInfo"]
    cursor = ""
    if page_info["hasNextPage"]:
        cursor = page_info["endCursor"]

    # Prepare data
    for edge in variants["edges"]:
        node = edge["node"]

        row = parse_static_fields(column_info.fields, node)

        for attribute in column_info.attributes:
            row.extend(parse_attribute_fields(attribute, node))

        for channel in column_info.channels:
            row.extend(parse_channel_fields(channel, node))

        for warehouse in column_info.warehouses:
            row.extend(parse_warehouse_fields(warehouse, node))

        rows.append(row)

    return rows, cursor


def m(values: List[str]) -> str:
    """Convert multiple values into a single cell"""
    return "\n".join(values)


def parse_static_fields(fields: List[ProductFieldEnum], node: dict):
    row = []
    product = node["product"]

    if ProductFieldEnum.ID in fields:
        row.append(node["id"])

    if ProductFieldEnum.NAME in fields:
        row.append(product["name"])

    if ProductFieldEnum.DESCRIPTION in fields:
        row.append(product["description"])

    if ProductFieldEnum.PRODUCT_TYPE in fields:
        row.append(product["productType"]["name"])

    if ProductFieldEnum.CATEGORY in fields:
        row.append(product["category"]["name"])

    if ProductFieldEnum.PRODUCT_WEIGHT in fields:
        value = product["weight"]["value"]
        unit = product["weight"]["unit"]
        row.append(f"{value}{unit}")

    if ProductFieldEnum.COLLECTIONS in fields:
        row.append(m([col["name"] for col in product["collections"]]))

    if ProductFieldEnum.CHARGE_TAXES in fields:
        row.append(product["chargeTaxes"])

    if ProductFieldEnum.PRODUCT_MEDIA in fields:
        row.append(m([img["url"] for img in product["media"]]))

    if ProductFieldEnum.VARIANT_ID in fields:
        row.append(node["id"])

    if ProductFieldEnum.VARIANT_SKU in fields:
        row.append(node["sku"])

    if ProductFieldEnum.VARIANT_WEIGHT in fields:
        value = node["weight"]["value"]
        unit = node["weight"]["unit"]
        row.append(f"{value}{unit}")

    if ProductFieldEnum.VARIANT_MEDIA in fields:
        row.append(m([img["url"] for img in node["media"]]))

    return row


def parse_attribute_fields(attribute: str, node: dict):
    return []


def parse_channel_fields(channel: str, node: dict):
    return []


def parse_warehouse_fields(warehouse: str, node: dict):
    return []
