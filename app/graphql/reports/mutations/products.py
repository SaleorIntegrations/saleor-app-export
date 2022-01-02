from typing import Optional

import strawberry

from app.core.export.products.fetch import fetch_products_response
from app.core.export.products.fields import ProductFieldEnum as ProductFields
from app.core.export.products.fields import (
    ProductSelectedColumnsInfo as ProductSelectedColumnsInfoModel,
)
from app.core.reports.models import ExportObjectTypesEnum
from app.graphql.reports.mutations.base import mutate_export_base
from app.graphql.reports.responses import (
    CreateReportResponse,
    ReportError,
    ReportErrorCode,
)

ProductFieldEnum = strawberry.enum(ProductFields)


MAX_DYNAMIC_COLUMNS = 100


@strawberry.experimental.pydantic.input(
    model=ProductSelectedColumnsInfoModel, all_fields=True
)
class ProductSelectedColumnsInput:
    pass


@strawberry.input
class ProductFilterInfo:
    filter_str: str


@strawberry.input
class ExportProductsInput:
    columns: ProductSelectedColumnsInput
    filter: Optional[ProductFilterInfo] = None


async def mutate_create_products_report(
    root, input: ExportProductsInput, info
) -> CreateReportResponse:
    """Mutation for triggering the products export process."""
    attributes = input.columns.attributes or []
    if len(attributes) > MAX_DYNAMIC_COLUMNS:
        return CreateReportResponse(
            errors=[
                ReportError(
                    code=ReportErrorCode.LIMIT_EXCEEDED,
                    message=(
                        f"Too many attributes requested. "
                        f"Max limit: {MAX_DYNAMIC_COLUMNS}",
                    ),
                    field="attributes",
                )
            ]
        )

    warehouses = input.columns.warehouses or []
    if len(warehouses) > MAX_DYNAMIC_COLUMNS:
        return CreateReportResponse(
            errors=[
                ReportError(
                    code=ReportErrorCode.LIMIT_EXCEEDED,
                    message=(
                        f"Too many warehouses requested. "
                        f"Max limit: {MAX_DYNAMIC_COLUMNS}"
                    ),
                    field="warehouses",
                )
            ]
        )

    return await mutate_export_base(
        root,
        input,
        info,
        fetch_products_response,
        ExportObjectTypesEnum.PRODUCTS,
    )
