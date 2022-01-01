import json
from json import JSONDecodeError
from typing import Optional

import strawberry
from gql.transport.exceptions import TransportQueryError

from app.core.export.orders.fetch import fetch_orders_response
from app.core.export.orders.fields import OrderFieldEnum as OrderFields
from app.core.export.orders.fields import (
    OrderSelectedColumnsInfo as OrderSelectedColumnsInfoModel,
)
from app.core.export.tasks import init_export_for_report
from app.core.reports.models import ExportObjectTypesEnum, ExportScopeEnum, Report
from app.graphql.reports import types
from app.graphql.reports.types import ExportError, ExportErrorResponse

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
            await fetch_orders_response(column_info, "", filter_input)
        except TransportQueryError as e:
            return ExportErrorResponse(
                code=ExportError.INVALID_FILTER,
                message=str(e),
                field="filterStr",
            )

    db = info.context["db"]
    report = Report(
        type=ExportObjectTypesEnum.ORDERS,
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
