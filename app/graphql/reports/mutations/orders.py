from typing import List

import strawberry

from app.core.reports.models import ExportObjectTypesEnum, Report
from app.graphql.reports import types as report_types


@strawberry.input
class ExportOrdersInfo:
    fields: List[str]
    fileType: str
    scope: str
    filter: str
    ids: List[str]


@strawberry.input
class ExportOrdersInput:
    export_info: ExportOrdersInfo


async def mutate_export_orders(
    root, input: ExportOrdersInput, info
) -> report_types.Report:
    db = info.context["db"]
    report = Report(
        type=ExportObjectTypesEnum.ORDERS,
        scope=input.export_info.scope,
        filter_input=input.export_info.filter,
        ids=input.export_info.ids,
    )
    db.add(report)
    await db.commit()
    return report
