from enum import Enum
from typing import List, Optional

import strawberry

from app.graphql.reports.types import Job, Report


@strawberry.enum
class ReportErrorCode(Enum):
    INVALID_FILTER = "invalid_filter"
    LIMIT_EXCEEDED = "limit_exceeded"


@strawberry.type
class ReportError:
    code: ReportErrorCode
    message: str
    field: str


@strawberry.type
class CreateReportResponse:
    report: Optional[Report] = None
    errors: List[ReportError] = strawberry.field(default_factory=list)


@strawberry.type
class RunReportResponse:
    job: Optional[Job]
