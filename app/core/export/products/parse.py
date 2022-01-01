from typing import List, Tuple

from app.core.export.products.fields import ProductFieldEnum, ProductSelectedColumnsInfo


def parse_products_response(
    column_info: ProductSelectedColumnsInfo,
    response: dict,
) -> Tuple[List[List[str]], str]:
    """Get headers for both static and dynamic fields"""
    # Prepare cursor information
    rows = []
    products = response["products"]
    page_info = products["pageInfo"]
    cursor = ""
    if page_info["hasNextPage"]:
        cursor = page_info["endCursor"]

    # Prepare data for each variant
    for edge in products["edges"]:
        product = edge["node"]

        for variant in product["variants"]:
            row = parse_static_fields(column_info.fields, product, variant)

            for attribute in column_info.attributes:
                row.extend(parse_attribute_fields(attribute, product, variant))

            for channel in column_info.channels:
                row.extend(parse_channel_fields(channel, product, variant))

            for warehouse in column_info.warehouses:
                row.extend(parse_warehouse_fields(warehouse, product, variant))

            rows.append(row)

    return rows, cursor


def m(values: List[str]) -> str:
    """Convert multiple values into a single cell"""
    return "\n".join(values)


def _parse_weight(weight: dict):
    if not weight:
        return ""
    value = weight["value"]
    unit = weight["unit"].lower()
    return f"{value}{unit}"


def parse_static_fields(fields: List[ProductFieldEnum], product: dict, variant: dict):
    row = []

    if ProductFieldEnum.ID in fields:
        row.append(variant["id"])

    if ProductFieldEnum.NAME in fields:
        row.append(product["name"])

    if ProductFieldEnum.DESCRIPTION in fields:
        row.append(product["description"])

    if ProductFieldEnum.PRODUCT_TYPE in fields:
        row.append(product["productType"]["name"])

    if ProductFieldEnum.CATEGORY in fields:
        row.append(product["category"]["name"])

    if ProductFieldEnum.PRODUCT_WEIGHT in fields:
        row.append(_parse_weight(product["weight"]))

    if ProductFieldEnum.COLLECTIONS in fields:
        row.append(m([col["name"] for col in product["collections"]]))

    if ProductFieldEnum.CHARGE_TAXES in fields:
        row.append(product["chargeTaxes"])

    if ProductFieldEnum.PRODUCT_MEDIA in fields:
        row.append(m([img["url"] for img in product["media"]]))

    if ProductFieldEnum.VARIANT_ID in fields:
        row.append(variant["id"])

    if ProductFieldEnum.VARIANT_SKU in fields:
        row.append(variant["sku"])

    if ProductFieldEnum.VARIANT_WEIGHT in fields:
        row.append(_parse_weight(variant["weight"]))

    if ProductFieldEnum.VARIANT_MEDIA in fields:
        row.append(m([img["url"] for img in variant["media"]]))

    return row


def parse_attribute_fields(attribute_id: str, product: dict, variant: dict):
    attribute_values = []

    for selected_attribute in variant["attributes"]:
        attribute = selected_attribute["attribute"]
        values = selected_attribute["values"]
        if attribute["id"] == attribute_id:
            attribute_values = [value["slug"] for value in values]
            break

    return [m(attribute_values)]


def parse_channel_fields(channel_id: str, product: dict, variant: dict):
    currency = ""
    amount = ""
    for listing in variant["channelListings"]:
        if listing["channel"]["id"] == channel_id:
            currency = listing["price"]["currency"]
            amount = listing["price"]["amount"]
            break

    return [currency, amount]


def parse_warehouse_fields(warehouse_id: str, product: dict, variant: dict):
    quantity = ""
    for stock in variant["stocks"]:
        if stock["warehouse"]["id"] == warehouse_id:
            quantity = stock["quantity"]
            break

    return [quantity]
