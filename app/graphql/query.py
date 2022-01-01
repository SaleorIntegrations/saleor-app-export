import strawberry
from strawberry.types import Info

from .reports.resolvers import resolve_report
from .reports.types import Report, ReportConnection


class empty:
    pass


@strawberry.type
class Query:
    report: Report = strawberry.field(resolve_report)

    @strawberry.field
    async def reports(self, info: Info) -> ReportConnection:
        return empty
