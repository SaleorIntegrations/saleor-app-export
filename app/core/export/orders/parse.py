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


def _parse_taxed_money(taxed_money: dict):
    """Return taxed money as a tuple"""
    return [
        taxed_money["gross"]["amount"],
        taxed_money["net"]["amount"],
        taxed_money["tax"]["amount"],
    ]


def _parse_address(address: dict):
    """Return address as a tuple"""
    if not address:
        return [""] * 11
    return [
        address["firstName"],
        address["lastName"],
        address["companyName"],
        address["streetAddress1"],
        address["streetAddress2"],
        address["city"],
        address["cityArea"],
        address["postalCode"],
        address["country"]["code"],
        address["countryArea"],
        address["phone"],
    ]


def parse_static_fields(fields: List[OrderFieldEnum], node: dict):
    row = []

    if OrderFieldEnum.ID in fields:
        row.append(node["id"])

    if OrderFieldEnum.NUMBER in fields:
        row.append(node["number"])

    if OrderFieldEnum.CREATED in fields:
        row.append(node["created"])

    if OrderFieldEnum.CHANNEL in fields:
        row.append(node["channel"]["slug"])

    if OrderFieldEnum.LANGUAGE_CODE in fields:
        row.append(node["languageCodeEnum"])

    if OrderFieldEnum.SHIPPING_METHOD in fields:
        row.append(node["shippingMethodName"])

    if OrderFieldEnum.CURRENCY in fields:
        row.append(node["total"]["currency"])

    if OrderFieldEnum.TOTAL in fields:
        row.extend(_parse_taxed_money(node["total"]))

    if OrderFieldEnum.SUBTOTAL in fields:
        row.extend(_parse_taxed_money(node["subtotal"]))

    if OrderFieldEnum.SHIPPING_PRICE in fields:
        row.extend(_parse_taxed_money(node["shippingPrice"]))

    if OrderFieldEnum.USER_EMAIL in fields:
        row.append(node["userEmail"])

    if OrderFieldEnum.SHIPPING_ADDRESS in fields:
        row.extend(_parse_address(node["shippingAddress"]))

    if OrderFieldEnum.BILLING_ADDRESS in fields:
        row.extend(_parse_address(node["billingAddress"]))

    if OrderFieldEnum.LINES_SKU in fields:
        row.append(m([item["productSku"] for item in node["lines"]]))

    if OrderFieldEnum.PAYMENT_STATUS in fields:
        row.append(node["paymentStatus"])

    if OrderFieldEnum.GATEWAY in fields:
        row.append(m([item["gateway"] for item in node["payments"]]))

    if OrderFieldEnum.PAYMENT_METHOD_TYPE in fields:
        row.append(m([item["paymentMethodType"] for item in node["payments"]]))

    if OrderFieldEnum.TOTAL_BALANCE in fields:
        row.append(node["totalBalance"]["amount"])

    if OrderFieldEnum.TOTAL_CAPTURED in fields:
        row.append(node["totalCaptured"]["amount"])

    if OrderFieldEnum.TOTAL_AUTHORIZED in fields:
        row.append(node["totalAuthorized"]["amount"])

    if OrderFieldEnum.STATUS in fields:
        row.append(node["status"])

    if OrderFieldEnum.TRACKING_NUMBER in fields:
        row.append(m([item["trackingNumber"] for item in node["fulfillments"]]))

    return row
