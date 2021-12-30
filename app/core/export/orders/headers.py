from typing import List

from app.core.export.orders.fields import OrderFieldEnum, OrderSelectedColumnsInfo

FIELD_ENUM_TO_HEADER_MAP = {
    OrderFieldEnum.ID: "ID",
    OrderFieldEnum.NUMBER: "Number",
    OrderFieldEnum.CURRENCY: "Currency",
    OrderFieldEnum.TOTAL_NET: "Total (net)",
    OrderFieldEnum.TOTAL_GROSS: "Total price (gross)",
    OrderFieldEnum.TOTAL_TAX: "Total (tax)",
    OrderFieldEnum.SUBTOTAL_NET: "Subtotal (net)",
    OrderFieldEnum.SUBTOTAL_GROSS: "Subtotal price (gross)",
    OrderFieldEnum.SUBTOTAL_TAX: "Subtotal (tax)",
    OrderFieldEnum.SHIPPING_PRICE_NET: "Shipping price (net)",
    OrderFieldEnum.SHIPPING_PRICE_GROSS: "Shipping price (gross)",
    OrderFieldEnum.SHIPPING_PRICE_TAX: "Shipping price (tax)",
}


async def get_headers(column_info: OrderSelectedColumnsInfo) -> List[str]:
    """Get headers for both static and dynamic fields"""
    headers = get_static_headers(column_info.fields)
    return headers


def get_static_headers(fields: List[OrderFieldEnum]):
    """Return static headers according to their order in the enum"""
    return [
        FIELD_ENUM_TO_HEADER_MAP[field] for field in OrderFieldEnum if field in fields
    ]
