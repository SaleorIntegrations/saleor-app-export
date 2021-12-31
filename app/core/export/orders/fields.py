from enum import Enum
from typing import List

from pydantic import BaseModel


class OrderFieldEnum(Enum):
    # Basic info
    ID = "ID"
    NUMBER = "NUMBER"
    CREATED = "CREATED"
    CHANNEL = "CHANNEL"
    LANGUAGE_CODE = "LANGUAGE_CODE"
    SHIPPING_METHOD = "SHIPPING_METHOD"
    # Financial information
    CURRENCY = "CURRENCY"
    TOTAL = "TOTAL"
    SUBTOTAL = "SUBTOTAL"
    SHIPPING_PRICE = "SHIPPING_PRICE"
    # Customer info
    USER_EMAIL = "USER_EMAIL"
    SHIPPING_ADDRESS = "SHIPPING_ADDRESS"
    BILLING_ADDRESS = "BILLING_ADDRESS"
    # Items
    LINES_SKU = "LINES_SKU"
    # Payments info
    PAYMENT_STATUS = "PAYMENT_STATUS"
    GATEWAY = "GATEWAY"
    PAYMENT_METHOD_TYPE = "PAYMENT_METHOD_TYPE"
    TOTAL_BALANCE = "TOTAL_BALANCE"
    TOTAL_CAPTURED = "TOTAL_CAPTURED"
    TOTAL_AUTHORIZED = "TOTAL_AUTHORIZED"
    # Fulfillments information
    STATUS = "STATUS"
    TRACKING_NUMBER = "TRACKING_NUMBER"


class OrderSelectedColumnsInfo(BaseModel):
    fields: List[OrderFieldEnum]
