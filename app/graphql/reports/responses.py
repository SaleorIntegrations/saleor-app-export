from typing import Optional

import strawberry

from app.graphql.reports.types import ExportErrorResponse, Job, Report

ExportResponse = strawberry.union("ExportResponse", [Report, ExportErrorResponse])


@strawberry.type
class RunReportResponse:
    job: Optional[Job]
