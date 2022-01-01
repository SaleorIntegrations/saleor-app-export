from typing import List, Optional, Tuple

from app.core.export.builder import MAX_PAGE_SIZE
from app.core.export.orders.fields import OrderFieldEnum


async def build_orders_query(
    cursor: str,
    columns: List[OrderFieldEnum],
    filter: dict,
) -> Tuple[str, Optional[dict]]:
    """
    Build the query for fetching products
    """
    # Build query arguments
    params_list = [
        f"first: {MAX_PAGE_SIZE}",
        "filter: $filter",
    ]
    if cursor:
        params_list.append(f'after: "{cursor}"')
    if filter:
        vars = {"filter": filter}
    else:
        vars = {"filter": None}
    params = ", ".join(params_list)

    # Build query fields
    fields = """
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

    # Build query arguments
    return (
        f"""
        fragment taxedMoney on TaxedMoney {{
          gross {{
            amount
          }}
          net {{
            amount
          }}
          tax {{
            amount
          }}
          currency
        }}

        fragment address on Address {{
          firstName
          lastName
          companyName
          streetAddress1
          streetAddress2
          city
          cityArea
          postalCode
          country {{code}}
          countryArea
          phone
        }}

        query FetchOrders($filter: OrderFilterInput) {{
            orders ({params}) {{
                pageInfo {{
                    endCursor
                    hasNextPage
                }}
                edges {{
                    node {{
                        {fields}
                    }}
                }}
            }}
        }}
    """,
        vars,
    )
