from typing import List

from app.core.export.products.fields import ProductFieldEnum


def parse_variants_response(
    export_fields: List[ProductFieldEnum],
    response: dict,
) -> List:
    return []
