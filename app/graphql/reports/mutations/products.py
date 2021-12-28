from typing import List

import strawberry

from app.core.export.products.tasks import export_products_task
from app.core.reports.models import ExportObjectTypesEnum, ExportScopeEnum, Report


@strawberry.input
class ExportProductsInfo:
    fields: List[str]
    fileType: str
    scope: str
    filter: str


@strawberry.input
class ExportProductsInput:
    export_info: ExportProductsInfo


async def mutate_export_products(root, input: ExportProductsInput, info):
    """
    Mutation for triggering the export process.
    """
    db = info.context["db"]

    report = Report(
        type=ExportObjectTypesEnum.PRODUCTS,
        scope=ExportScopeEnum.FILTER,
        filter_input=input.export_info.filter,
    )
    db.add(report)
    await db.commit()

    await export_products_task(report.id)
    return report
