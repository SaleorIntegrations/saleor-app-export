from typing import List

from app.core.export.builder import MAX_PAGE_SIZE
from app.core.export.products.fields import ProductFieldEnum


async def build_variants_query(
    cursor: str,
    selected_fields: List[ProductFieldEnum],
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
        sku
        media {
          url
        }
        weight {
          unit
          value
        }
        product {
          name
          description
          productType {
            name
          }
          category {
            name
          }
          weight {
            unit
            value
          }
          media {
            url
          }
          collections {
            name
          }
          chargeTaxes
        }
        channelListings {
          channel {
            id
          }
          price {
            currency
            amount
          }
        }
        stocks {
          warehouse {
            id
          }
          quantity
        }
    """

    # Build query arguments
    return f"""
        query {{
            productVariants ({params}) {{
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
