import json
from json import JSONDecodeError
from typing import Any, Awaitable, Callable

from gql.transport.exceptions import TransportQueryError

from app.core.export.tasks import start_job_for_report
from app.core.reports.models import ExportObjectTypesEnum, ExportScopeEnum, Report
from app.graphql.reports import types
from app.graphql.reports.types import ExportError, ExportErrorResponse


async def mutate_export_base(
    root,
    input,
    info,
    fetch_response: Callable[[Any, str, dict], Awaitable],
    type: ExportObjectTypesEnum,
):
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
            await fetch_response(column_info, "", filter_input)
        except TransportQueryError as e:
            return ExportErrorResponse(
                code=ExportError.INVALID_FILTER,
                message=str(e),
                field="filterStr",
            )

    db = info.context["db"]
    report = Report(
        type=type,
        scope=ExportScopeEnum.FILTER,
        filter_input=filter_input,
        columns=json.loads(column_info.json()),
    )
    db.add(report)
    await db.commit()
    start_job_for_report.delay(report.id)
    return types.Report(
        id=report.id,
        type=report.type,
    )
