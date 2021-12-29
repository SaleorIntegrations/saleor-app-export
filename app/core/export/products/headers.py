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

    for attribute in column_info.attributes:
        headers.extend(get_attribute_headers(attribute))

    for channel in column_info.channels:
        headers.extend(get_channel_headers(channel))

    for warehouse in column_info.warehouses:
        headers.extend(get_warehouse_headers(warehouse))

    return headers


def get_static_headers(fields: List[ProductFieldEnum]):
    """Return static headers according to their order in the enum"""
    return [
        FIELD_ENUM_TO_HEADER_MAP[field] for field in ProductFieldEnum if field in fields
    ]


def get_attribute_headers(attribute: str):
    """Return headers for a single attribute"""
    return [attribute]


def get_channel_headers(channel: str):
    """Return headers for a single channel"""
    return [
        f"Price ({channel})",
        f"Currency ({channel})",
    ]


def get_warehouse_headers(warehouse: str):
    """Return headers for a single warehouse"""
    return [
        f"Stock quantity ({warehouse})",
    ]
