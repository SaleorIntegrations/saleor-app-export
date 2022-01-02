from typing import Optional

import strawberry

from app.core.export.orders.fetch import fetch_orders_response
from app.core.export.orders.fields import OrderFieldEnum as OrderFields
from app.core.export.orders.fields import (
    OrderSelectedColumnsInfo as OrderSelectedColumnsInfoModel,
)
from app.core.reports.models import ExportObjectTypesEnum
from app.graphql.reports.mutations.base import mutate_report_base

OrderFieldEnum = strawberry.enum(OrderFields)


@strawberry.experimental.pydantic.input(
    model=OrderSelectedColumnsInfoModel, all_fields=True
)
class OrderSelectedColumnsInput:
    pass


@strawberry.input
class OrderFilterInfo:
    filter_str: str


@strawberry.input
class ExportOrdersInput:
    columns: OrderSelectedColumnsInput
    filter: Optional[OrderFilterInfo] = None


async def mutate_order_report_base(
    root,
    input,
    info,
    report_id: Optional[int] = None,
):
    """Common base for creating and updating order reports."""
    return await mutate_report_base(
        root,
        input,
        info,
        fetch_orders_response,
        ExportObjectTypesEnum.ORDERS,
        report_id,
    )


async def mutate_create_orders_report(root, input: ExportOrdersInput, info):
    return await mutate_order_report_base(
        root,
        input,
        info,
    )


async def mutate_update_orders_report(
    root, report_id: int, input: ExportOrdersInput, info
):
    return await mutate_order_report_base(root, input, info, report_id)
