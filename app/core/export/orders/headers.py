from typing import List

from app.core.export.orders.fields import OrderFieldEnum, OrderSelectedColumnsInfo

FIELD_ENUM_TO_HEADER_MAP = {
    OrderFieldEnum.ID: "ID",
    OrderFieldEnum.NUMBER: "Number",
    OrderFieldEnum.CREATED: "Created at",
    OrderFieldEnum.CHANNEL: "Channel",
    OrderFieldEnum.LANGUAGE_CODE: "Language code",
    OrderFieldEnum.SHIPPING_METHOD: "Shipping method",
    OrderFieldEnum.CURRENCY: "Currency",
    OrderFieldEnum.TOTAL: [
        "Total (net)",
        "Total (gross)",
        "Total (tax)",
    ],
    OrderFieldEnum.SUBTOTAL: ["Subtotal (net)", "Subtotal (gross)", "Subtotal (tax)"],
    OrderFieldEnum.SHIPPING_PRICE: [
        "Shipping price (net)",
        "Shipping price (gross)",
        "Shipping price (tax)",
    ],
    OrderFieldEnum.USER_EMAIL: "User email",
    OrderFieldEnum.SHIPPING_ADDRESS: [
        "First name (shipping)",
        "Last name (shipping)",
        "Company name (shipping)",
        "Street address 1 (shipping)",
        "Street address 2 (shipping)",
        "City (shipping)",
        "City area (shipping)",
        "Postal code (shipping)",
        "Country (shipping)",
        "Country area (shipping)",
        "Phone (shipping)",
    ],
    OrderFieldEnum.BILLING_ADDRESS: [
        "First name (billing)",
        "Last name (billing)",
        "Company name (billing)",
        "Street address 1 (billing)",
        "Street address 2 (billing)",
        "City (billing)",
        "City area (billing)",
        "Postal code (billing)",
        "Country (billing)",
        "Country area (billing)",
        "Phone (billing)",
    ],
    OrderFieldEnum.LINES_SKU: "Lines SKU",
    OrderFieldEnum.PAYMENT_STATUS: "Payment status",
    OrderFieldEnum.GATEWAY: "Gateway",
    OrderFieldEnum.PAYMENT_METHOD_TYPE: "Payment method type",
    OrderFieldEnum.TOTAL_BALANCE: "Total balance",
    OrderFieldEnum.TOTAL_CAPTURED: "Total captured",
    OrderFieldEnum.TOTAL_AUTHORIZED: "Total authorized",
    OrderFieldEnum.STATUS: "Status",
    OrderFieldEnum.TRACKING_NUMBER: "Tracking number",
}


async def get_headers(column_info: OrderSelectedColumnsInfo) -> List[str]:
    """Get headers for both static and dynamic fields"""
    headers = get_static_headers(column_info.fields)
    return headers


def get_static_headers(fields: List[OrderFieldEnum]):
    """Return static headers according to their order in the enum"""

    headers = []
    for field in OrderFieldEnum:
        if field in fields:
            h = FIELD_ENUM_TO_HEADER_MAP[field]
            if isinstance(h, str):
                headers.append(h)
            else:
                headers.extend(h)
    return headers
