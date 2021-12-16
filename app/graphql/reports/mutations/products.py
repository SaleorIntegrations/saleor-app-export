from typing import List

import strawberry

from app.core.reports.models import ExportObjectTypesEnum, Report


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
    report = Report(
        type=ExportObjectTypesEnum.PRODUCTS,
        scope=input.export_info.scope,
        filter_input=input.export_info.filter,
        ids=input.export_info.ids,
    )
    db.add(report)
    await db.commit()
    return report
