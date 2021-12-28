from typing import List

import strawberry
from strawberry.types import Info

from app.core.reports.models import ExportObjectTypesEnum
from app.graphql.reports.resolvers import resolve_reports, resolve_reports_count

ReportTypes = strawberry.enum(ExportObjectTypesEnum)


@strawberry.type
class Report:
    id: int
    type: ReportTypes


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
