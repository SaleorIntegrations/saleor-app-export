from typing import List

import strawberry

from app.core.reports.models import ExportObjectTypesEnum, Report
from app.core.export.products.tasks import export_products_task


@strawberry.input
class ExportProductsInfo:
    fields: List[str]
    fileType: str
    scope: str
    filter: str
    ids: List[str]


@strawberry.input
class ExportProductsInput:
    export_info: ExportProductsInfo


async def mutate_export_products(root, input: ExportProductsInput, info):
    db = info.context["db"]
    print(f"SCOPE!: {input.export_info.scope}")
    report = Report(
        type=ExportObjectTypesEnum.PRODUCTS,
        scope=input.export_info.scope,
        filter_input=input.export_info.filter,
        ids=input.export_info.ids,
    )
    db.add(report)
    await db.commit()
    # TODO validate the input before passing it to the task
    # Also, consider sending just export_info
    # and access its attributes in the functions
    export_products_task(
        report.id,
        input.export_info.scope,
        input.export_info,
        input.export_info.fileType,
    )
    return report
