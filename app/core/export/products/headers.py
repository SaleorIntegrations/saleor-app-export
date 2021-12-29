from typing import List

from app.core.export.products.fields import ProductFieldEnum, ProductSelectedColumnsInfo

FIELD_ENUM_TO_HEADER_MAP = {
    ProductFieldEnum.ID: "ID",
    ProductFieldEnum.NAME: "Name",
    ProductFieldEnum.DESCRIPTION: "Description",
    ProductFieldEnum.PRODUCT_TYPE: "Product type",
    ProductFieldEnum.CATEGORY: "Category",
    ProductFieldEnum.PRODUCT_WEIGHT: "Product weight",
    ProductFieldEnum.COLLECTIONS: "Collections",
    ProductFieldEnum.CHARGE_TAXES: "Charge taxes",
    ProductFieldEnum.PRODUCT_MEDIA: "Product images",
    ProductFieldEnum.VARIANT_ID: "Variant ID",
    ProductFieldEnum.VARIANT_SKU: "Variant SKU",
    ProductFieldEnum.VARIANT_WEIGHT: "Variant weight",
    ProductFieldEnum.VARIANT_MEDIA: "Variant images",
}


def get_headers(column_info: ProductSelectedColumnsInfo) -> List[str]:
    """Get headers for both static and dynamic fields"""
    headers = get_static_headers(column_info.fields)
    return headers


def get_static_headers(fields: List[ProductFieldEnum]):
    """Return static headers according to their order in the enum"""
    return [
        FIELD_ENUM_TO_HEADER_MAP[field] for field in ProductFieldEnum if field in fields
    ]
