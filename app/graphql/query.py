from typing import Optional

import strawberry

from .reports.resolvers import resolve_job, resolve_report, resolve_reports
from .reports.types import Job, Report, ReportConnection


@strawberry.type
class Query:
    report: Optional[Report] = strawberry.field(resolve_report)
    job: Optional[Job] = strawberry.field(resolve_job)
    reports: ReportConnection = strawberry.field(resolve_reports)
