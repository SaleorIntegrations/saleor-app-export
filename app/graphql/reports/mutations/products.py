from typing import Optional

import strawberry

from app.core.export.products.fetch import fetch_products_response
from app.core.export.products.fields import ProductFieldEnum as ProductFields
from app.core.export.products.fields import (
    ProductSelectedColumnsInfo as ProductSelectedColumnsInfoModel,
)
from app.core.reports.models import ExportObjectTypesEnum
from app.graphql.reports.mutations.base import mutate_report_base
from app.graphql.reports.responses import ReportError, ReportErrorCode, ReportResponse

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


async def mutate_products_report_base(
    root,
    input,
    info,
    report_id: Optional[int] = None,
) -> ReportResponse:
    """Common base for creating and updating product reports."""

    attributes = input.columns.attributes or []
    if len(attributes) > MAX_DYNAMIC_COLUMNS:
        return ReportResponse(
            errors=[
                ReportError(
                    code=ReportErrorCode.LIMIT_EXCEEDED,
                    message=(
                        f"Too many attributes requested. "
                        f"Max limit: {MAX_DYNAMIC_COLUMNS}"
                    ),
                    field="attributes",
                )
            ]
        )

    warehouses = input.columns.warehouses or []
    if len(warehouses) > MAX_DYNAMIC_COLUMNS:
        return ReportResponse(
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

    return await mutate_report_base(
        root,
        input,
        info,
        fetch_products_response,
        ExportObjectTypesEnum.PRODUCTS,
        report_id,
    )


async def mutate_create_products_report(
    root, input: ExportProductsInput, info
) -> ReportResponse:
    return await mutate_products_report_base(
        root,
        input,
        info,
    )


async def mutate_update_products_report(
    root, report_id: int, input: ExportProductsInput, info
):
    return await mutate_products_report_base(
        root,
        input,
        info,
        report_id,
    )
