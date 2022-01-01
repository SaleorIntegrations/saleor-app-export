from app.core.export.builder import build_query_base
from app.core.export.products.fields import ProductSelectedColumnsInfo


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


VARIANT_FIELDS = """
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


def build_variants_query(
    cursor: str,
    column_info: ProductSelectedColumnsInfo,
    filter: dict,
):
    """Build the query for fetching products"""
    return build_query_base(
        "", "FetchVariants", "ProductVariantFilterInput", VARIANT_FIELDS, cursor, filter
    )
