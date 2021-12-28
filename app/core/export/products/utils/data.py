from typing import Any, Dict, List, Optional, Set, Union

from .. import ProductExportFields


def get_products_data(
    products: List[Dict[str, Any]],
    export_fields: Set[str],
    attribute_ids: Optional[List[int]],
    warehouse_ids: Optional[List[int]],
    channel_ids: Optional[List[int]],
) -> List[Dict[str, Union[str, bool]]]:
    """Create data list of products and their variants with fields values.

    It returns a list with product and variant data which can be used as import to
    csv writer and a list of attribute and warehouse headers.
    """

    products_with_variants_data = []

    product_fields = set(ProductExportFields.PRODUCT_FIELDS["fields"].keys())
    product_export_fields = export_fields & product_fields
    product_export_fields.add("variants__id")

    products_data = []

    for item in products:
        extra_fields = {
            "product_weight": str(item["node"]["weight"]["value"]) + " g"
            if item["node"].get("weight") and item["node"]["weight"]["value"]
            else "",
            "variant_weight": str(item["node"]["defaultVariant"]["weight"]) + " g"
            if item["node"].get("defaultVariant")
            and item["node"]["defaultVariant"]["weight"]
            else "",
        }
        item["node"].update(extra_fields)
        products_data.append(item)

    products_with_variants_data = products_data

    return products_with_variants_data
