from enum import Enum
from typing import List, Optional

from pydantic import BaseModel, Field


class ProductFieldEnum(Enum):
    ID = "ID"
    NAME = "NAME"
    DESCRIPTION = "DESCRIPTION"
    PRODUCT_TYPE = "PRODUCT_TYPE"
    CATEGORY = "CATEGORY"
    PRODUCT_WEIGHT = "PRODUCT_WEIGHT"
    COLLECTIONS = "COLLECTIONS"
    CHARGE_TAXES = "CHARGE_TAXES"
    PRODUCT_MEDIA = "PRODUCT_MEDIA"
    VARIANT_ID = "VARIANT_ID"
    VARIANT_SKU = "VARIANT_SKU"
    VARIANT_WEIGHT = "VARIANT_WEIGHT"
    VARIANT_MEDIA = "VARIANT_MEDIA"


class ProductSelectedColumnsInfo(BaseModel):
    fields: List[ProductFieldEnum]
    attributes: Optional[List[str]] = Field(default_factory=list)
    warehouses: Optional[List[str]] = Field(default_factory=list)
    channels: Optional[List[str]] = Field(default_factory=list)
