from typing import List

from app.core.export.builder import MAX_PAGE_SIZE
from app.core.export.products.fields import ProductFieldEnum, ProductSelectedColumnsInfo


async def build_headers_query(column_info: ProductSelectedColumnsInfo) -> str:
    """
    Fetch mappings for dynamic header values
    """
    # Build query arguments
    attribute_ids = str(column_info.attributes).replace("'", '"')
    warehouse_ids = str(column_info.warehouses).replace("'", '"')
    return f"""
        query {{
            attributes (
                first: 100,
                filter: {{ids: {attribute_ids}}}
            ) {{
                edges {{
                    node {{
                        id
                        name
                    }}
                }}
            }}
            channels {{
                id
                name
            }}
            warehouses (
                first: 100,
                filter: {{ids: {warehouse_ids}}}
            ) {{
                edges {{
                    node {{
                        id
                        name
                    }}
                }}
            }}
        }}
    """


async def build_variants_query(
    cursor: str,
    columns: List[ProductFieldEnum],
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
        attributes {
          attribute {
            id
            slug
            name
            inputType
          }
          values {
            name
            slug
            value
            inputType
            reference
            file {
              url
            }
            richText
            boolean
            date
            dateTime
          }
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
