from typing import List, Tuple

from app.core.export.orders.fields import OrderFieldEnum, OrderSelectedColumnsInfo


def parse_orders_response(
    column_info: OrderSelectedColumnsInfo,
    response: dict,
) -> Tuple[List[List[str]], str]:
    """Get headers for both static and dynamic fields"""
    # Prepare cursor information
    rows = []
    variants = response["orders"]
    page_info = variants["pageInfo"]
    cursor = ""
    if page_info["hasNextPage"]:
        cursor = page_info["endCursor"]

    # Prepare data
    for edge in variants["edges"]:
        node = edge["node"]
        row = parse_static_fields(column_info.fields, node)
        rows.append(row)

    return rows, cursor


def m(values: List[str]) -> str:
    """Convert multiple values into a single cell"""
    return "\n".join(values)


def parse_static_fields(fields: List[OrderFieldEnum], node: dict):
    row = []

    if OrderFieldEnum.ID in fields:
        row.append(node["id"])

    if OrderFieldEnum.NUMBER in fields:
        row.append(node["number"])

    if OrderFieldEnum.CURRENCY in fields:
        row.append(node["number"])

    if OrderFieldEnum.TOTAL_NET in fields:
        row.append(node["total"]["net"]["amount"])

    if OrderFieldEnum.TOTAL_GROSS in fields:
        row.append(node["total"]["gross"]["amount"])

    if OrderFieldEnum.TOTAL_TAX in fields:
        row.append(node["total"]["tax"]["amount"])

    if OrderFieldEnum.SUBTOTAL_NET in fields:
        row.append(node["subtotal"]["net"]["amount"])

    if OrderFieldEnum.SUBTOTAL_GROSS in fields:
        row.append(node["subtotal"]["gross"]["amount"])

    if OrderFieldEnum.SUBTOTAL_TAX in fields:
        row.append(node["subtotal"]["tax"]["amount"])

    if OrderFieldEnum.SHIPPING_PRICE_NET in fields:
        row.append(node["shippingPrice"]["net"]["amount"])

    if OrderFieldEnum.SHIPPING_PRICE_GROSS in fields:
        row.append(node["shippingPrice"]["gross"]["amount"])

    if OrderFieldEnum.SHIPPING_PRICE_TAX in fields:
        row.append(node["shippingPrice"]["tax"]["amount"])

    return row
