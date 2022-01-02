from typing import Optional

import strawberry
from strawberry.types import Info

from .reports.resolvers import resolve_job, resolve_report
from .reports.types import Job, Report, ReportConnection


class empty:
    pass


@strawberry.type
class Query:
    report: Optional[Report] = strawberry.field(resolve_report)
    job: Optional[Job] = strawberry.field(resolve_job)

    @strawberry.field
    async def reports(self, info: Info) -> ReportConnection:
        return empty
