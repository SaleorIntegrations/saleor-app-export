from datetime import datetime
from typing import List, Optional

import strawberry

from app.core.export.fields import RecipientInfo as RecipientInfoModel
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
    resolve_report_edges,
    resolve_report_filter,
    resolve_report_page_info,
    resolve_report_recipients,
    resolve_reports_count,
)

ReportTypes = strawberry.enum(ExportObjectTypesEnum)


@strawberry.experimental.pydantic.type(model=RecipientInfoModel, all_fields=True)
class RecipientInfo:
    pass


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
    recipients: RecipientInfo = strawberry.field(resolve_report_recipients)


@strawberry.type
class Job:
    id: int
    created_at: datetime
    report: Report = strawberry.field(resolve_job_report)


@strawberry.type
class ReportEdge:
    node: Report


@strawberry.type
class PageInfo:
    has_next: bool
    end_cursor: Optional[str]


@strawberry.type
class ReportConnection:
    edges: List[ReportEdge] = strawberry.field(resolve_report_edges)
    page_info: PageInfo = strawberry.field(resolve_report_page_info)
    total_count: int = strawberry.field(resolve_reports_count)
