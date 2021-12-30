from typing import List

from app.core.export.builder import MAX_PAGE_SIZE
from app.core.export.orders.fields import OrderFieldEnum


async def build_orders_query(
    cursor: str,
    columns: List[OrderFieldEnum],
) -> str:
    """
    Build the query for fetching products
    """
    # Build query arguments
    params_list = [f"first: {MAX_PAGE_SIZE}"]
    if cursor:
        params_list.append(f'after: "{cursor}"')
    params = ", ".join(params_list)

    # Build query fields
    fields = """
        id
        number
        isShippingRequired
        total {
          currency
          net {
            amount
          }
          gross {
            amount
          }
          tax {
            amount
          }
        }
        subtotal {
          currency
          net {
            amount
          }
          gross {
            amount
          }
          tax {
            amount
          }
        }
        shippingPrice {
          currency
          net {
            amount
          }
          gross {
            amount
          }
          tax {
            amount
          }
        }
    """

    # Build query arguments
    return f"""
        query {{
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
    """
