from typing import List

from app.core.export.builder import build_query_base
from app.core.export.orders.fields import OrderFieldEnum

ORDER_FIELDS = """
    id
    number
    created
    channel {slug}
    languageCodeEnum
    shippingMethodName
    total {...taxedMoney}
    subtotal {...taxedMoney}
    shippingPrice {...taxedMoney}
    userEmail
    shippingAddress {...address}
    billingAddress {...address}
    lines {productSku}
    paymentStatus
    payments {
      gateway
      paymentMethodType
    }
    totalBalance {amount}
    totalCaptured {amount}
    totalAuthorized {amount}
    status
    fulfillments {
      trackingNumber
    }
"""

ORDER_FRAGMENTS = """
    fragment taxedMoney on TaxedMoney {
      gross {
        amount
      }
      net {
        amount
      }
      tax {
        amount
      }
      currency
    }

    fragment address on Address {
      firstName
      lastName
      companyName
      streetAddress1
      streetAddress2
      city
      cityArea
      postalCode
      country {code}
      countryArea
      phone
    }
"""


def build_orders_query(
    cursor: str,
    columns: List[OrderFieldEnum],
    filter: dict,
):
    """Build the query for fetching orders"""
    return build_query_base(
        ORDER_FRAGMENTS, "FetchOrders", "OrderFilterInput", ORDER_FIELDS, cursor, filter
    )
