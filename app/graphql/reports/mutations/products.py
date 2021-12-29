from typing import List, Optional

import strawberry
from strawberry import ID

from app.core.export.products.fields import ProductFieldEnum as ProductFields
from app.core.export.products.tasks import init_export_for_report
from app.core.reports.models import ExportObjectTypesEnum, ExportScopeEnum, Report

ProductFieldEnum = strawberry.enum(ProductFields)


@strawberry.input
class ProductSelectedColumnsInfo:
    fields: List[ProductFieldEnum]
    attributes: Optional[List[ID]] = None
    warehouses: Optional[List[ID]] = None
    channels: Optional[List[ID]] = None


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
        selected_fields=input.columns,
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
