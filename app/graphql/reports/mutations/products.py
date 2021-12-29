from typing import Optional

import strawberry

from app.core.export.products.fields import ProductFieldEnum as ProductFields
from app.core.export.products.fields import (
    ProductSelectedColumnsInfo as ProductSelectedColumnsInfoModel,
)
from app.core.export.products.tasks import init_export_for_report
from app.core.reports.models import ExportObjectTypesEnum, ExportScopeEnum, Report

ProductFieldEnum = strawberry.enum(ProductFields)


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


async def mutate_export_products(root, input: ExportProductsInput, info):
    """
    Mutation for triggering the export process.
    """
    db = info.context["db"]

    report = Report(
        type=ExportObjectTypesEnum.PRODUCTS,
        scope=ExportScopeEnum.FILTER,
        filter_input=input.filter.filter_str if input.filter else "",
        columns={
            "fields": [f.name for f in input.columns.fields],
            "attributes": input.columns.attributes or [],
            "channels": input.columns.channels or [],
            "warehouses": input.columns.warehouses or [],
        },
    )
    db.add(report)
    await db.commit()

    await perform_export(db, report.id)
    return report


async def perform_export(db, report_id):
    async def inner():
        return await init_export_for_report(db, report_id)

    # TODO: use async_to_sync in Celery
    # async_to_sync(inner)()
    await inner()
