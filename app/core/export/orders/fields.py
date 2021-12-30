from enum import Enum
from typing import List

from pydantic import BaseModel


class OrderFieldEnum(Enum):
    ID = "ID"
    NUMBER = "NUMBER"
    CURRENCY = "CURRENCY"
    TOTAL_NET = "TOTAL_NET"
    TOTAL_GROSS = "TOTAL_GROSS"
    TOTAL_TAX = "TOTAL_GROSS"
    SUBTOTAL_NET = "SUBTOTAL_NET"
    SUBTOTAL_GROSS = "SUBTOTAL_GROSS"
    SUBTOTAL_TAX = "SUBTOTAL_GROSS"
    SHIPPING_PRICE_NET = "SHIPPING_PRICE_NET"
    SHIPPING_PRICE_GROSS = "SHIPPING_PRICE_GROSS"
    SHIPPING_PRICE_TAX = "SHIPPING_PRICE_GROSS"


class OrderSelectedColumnsInfo(BaseModel):
    fields: List[OrderFieldEnum]
