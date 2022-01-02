from datetime import datetime
from typing import List, Optional

import strawberry
from strawberry.types import Info

from app.core.export.orders.fields import (
    OrderSelectedColumnsInfo as OrderSelectedColumnsInfoModel,
)
from app.core.export.products.fields import (
    ProductSelectedColumnsInfo as ProductSelectedColumnsInfoModel,
)
from app.core.reports.models import ExportObjectTypesEnum
from app.graphql.reports.resolvers import (
    resolve_job_report,
    resolve_report_columns,
    resolve_report_filter,
    resolve_reports,
    resolve_reports_count,
)

ReportTypes = strawberry.enum(ExportObjectTypesEnum)


@strawberry.experimental.pydantic.type(
    model=ProductSelectedColumnsInfoModel, all_fields=True
)
class ProductSelectedColumnsInfo:
    pass


@strawberry.experimental.pydantic.type(
    model=OrderSelectedColumnsInfoModel, all_fields=True
)
class OrderSelectedColumnsInfo:
    pass


SelectedColumnsInfo = strawberry.union(
    "SelectedColumnsInfo",
    [
        ProductSelectedColumnsInfo,
        OrderSelectedColumnsInfo,
    ],
)


@strawberry.type
class Report:
    id: int
    name: str
    type: ReportTypes
    filter: Optional[str] = strawberry.field(resolve_report_filter)
    columns: SelectedColumnsInfo = strawberry.field(resolve_report_columns)


@strawberry.type
class Job:
    id: int
    created_at: datetime
    report: Report = strawberry.field(resolve_job_report)


@strawberry.type
class ReportEdge:
    node: Report
    cursor: str


@strawberry.type
class ReportConnection:
    @strawberry.field
    async def edges(self, info: Info) -> List[ReportEdge]:
        reports = await resolve_reports(info.context["db"])
        return [ReportEdge(node=r, cursor=r.id) for r in reports]

    @strawberry.field
    async def totalCount(self, info: Info) -> int:
        return await resolve_reports_count(info.context["db"])
