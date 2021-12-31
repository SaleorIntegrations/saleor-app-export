from typing import Optional

import strawberry

from app.core.export.orders.fields import OrderFieldEnum as OrderFields
from app.core.export.orders.fields import (
    OrderSelectedColumnsInfo as OrderSelectedColumnsInfoModel,
)
from app.core.export.tasks import init_export_for_report
from app.core.reports.models import ExportObjectTypesEnum, ExportScopeEnum, Report
from app.graphql.reports import types

OrderFieldEnum = strawberry.enum(OrderFields)


@strawberry.experimental.pydantic.input(
    model=OrderSelectedColumnsInfoModel, all_fields=True
)
class OrderSelectedColumnsInfo:
    pass


@strawberry.input
class OrderFilterInfo:
    filter_str: str


@strawberry.input
class ExportOrdersInput:
    columns: OrderSelectedColumnsInfo
    filter: Optional[OrderFilterInfo] = None


async def mutate_export_orders(root, input: ExportOrdersInput, info):
    """Mutation for triggering the orders export process."""
    db = info.context["db"]
    report = Report(
        type=ExportObjectTypesEnum.ORDERS,
        scope=ExportScopeEnum.FILTER,
        filter_input=input.filter.filter_str if input.filter else "",
        columns={
            "fields": [f.name for f in input.columns.fields],
        },
    )
    db.add(report)
    await db.commit()
    init_export_for_report.apply_async([report.id])
    return types.Report(
        id=report.id,
        type=report.type,
    )
