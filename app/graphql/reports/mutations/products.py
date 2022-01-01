import json
from json import JSONDecodeError
from typing import Optional

import strawberry
from gql.transport.exceptions import TransportQueryError

from app.core.export.products.fetch import fetch_products_response
from app.core.export.products.fields import ProductFieldEnum as ProductFields
from app.core.export.products.fields import (
    ProductSelectedColumnsInfo as ProductSelectedColumnsInfoModel,
)
from app.core.export.tasks import init_export_for_report
from app.core.reports.models import ExportObjectTypesEnum, ExportScopeEnum, Report
from app.graphql.reports import types
from app.graphql.reports.types import ExportError, ExportErrorResponse, ExportResponse

ProductFieldEnum = strawberry.enum(ProductFields)


MAX_DYNAMIC_COLUMNS = 100


@strawberry.experimental.pydantic.input(
    model=ProductSelectedColumnsInfoModel, all_fields=True
)
class ProductSelectedColumnsInfo:
    pass


@strawberry.input
class ProductFilterInfo:
    filter_str: str


@strawberry.input
class ExportProductsInput:
    columns: ProductSelectedColumnsInfo
    filter: Optional[ProductFilterInfo] = None


async def mutate_export_products(
    root, input: ExportProductsInput, info
) -> ExportResponse:
    """Mutation for triggering the products export process."""
    attributes = input.columns.attributes or []
    if len(attributes) > MAX_DYNAMIC_COLUMNS:
        return ExportErrorResponse(
            code=ExportError.LIMIT_EXCEEDED,
            message=f"Too many attributes requested. Max limit: {MAX_DYNAMIC_COLUMNS}",
            field="attributes",
        )

    warehouses = input.columns.warehouses or []
    if len(warehouses) > MAX_DYNAMIC_COLUMNS:
        return ExportErrorResponse(
            code=ExportError.LIMIT_EXCEEDED,
            message=f"Too many warehouses requested. Max limit: {MAX_DYNAMIC_COLUMNS}",
            field="warehouses",
        )

    filter_input = {}
    if input.filter:
        try:
            filter_input = json.loads(input.filter.filter_str)
        except JSONDecodeError:
            return ExportErrorResponse(
                code=ExportError.INVALID_FILTER,
                message="Provided `filterStr` contains invalid JSON.",
                field="filterStr",
            )

    column_info = input.columns.to_pydantic()
    if filter_input:
        try:
            await fetch_products_response(column_info, "", filter_input)
        except TransportQueryError as e:
            return ExportErrorResponse(
                code=ExportError.INVALID_FILTER,
                message=str(e),
                field="filterStr",
            )

    db = info.context["db"]
    report = Report(
        type=ExportObjectTypesEnum.PRODUCTS,
        scope=ExportScopeEnum.FILTER,
        filter_input=filter_input,
        columns=json.loads(column_info.json()),
    )
    db.add(report)
    await db.commit()
    init_export_for_report.delay(report.id)
    return types.Report(
        id=report.id,
        type=report.type,
    )
