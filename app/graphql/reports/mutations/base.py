import json
from json import JSONDecodeError
from typing import Any, Awaitable, Callable, Optional

import strawberry
from gql.transport.exceptions import TransportQueryError
from sqlalchemy import delete
from sqlalchemy.exc import NoResultFound

from app.core.export.fetch import fetch_recipients, fetch_report_by_id
from app.core.export.fields import RecipientInfo
from app.core.export.fields import RecipientInfo as RecipientInfoModel
from app.core.reports.models import (
    ExportObjectTypesEnum,
    ExportScopeEnum,
    Job,
    OutputFormatEnum,
    Report,
)
from app.graphql.reports.responses import (
    DeleteReportResponse,
    ReportError,
    ReportErrorCode,
    ReportResponse,
)


@strawberry.input
class FilterInfoInput:
    filter_str: str


@strawberry.experimental.pydantic.input(model=RecipientInfoModel, all_fields=True)
class RecipientInfoInput:
    pass


async def mutate_report_base(
    root,
    input,
    info,
    fetch_response: Callable[[Any, str, dict], Awaitable],
    type: ExportObjectTypesEnum,
    report_id: Optional[int] = None,
):
    """Common base for creating and updating reports."""

    db = info.context["db"]
    if report_id:
        try:
            report = await fetch_report_by_id(db, report_id)
        except NoResultFound:
            return ReportResponse(
                errors=[
                    ReportError(
                        code=ReportErrorCode.NOT_FOUND,
                        message="Report with given id not found",
                        field="reportId",
                    )
                ]
            )

        if report.type != type:
            return ReportResponse(
                errors=[
                    ReportError(
                        code=ReportErrorCode.INVALID_TYPE,
                        message=(
                            "This mutation cannot be used for reports of this type."
                        ),
                        field="reportId",
                    )
                ]
            )

    recipient_info: RecipientInfo = input.recipients.to_pydantic()
    if not any([recipient_info.users, recipient_info.permission_groups]):
        return ReportResponse(
            errors=[
                ReportError(
                    code=ReportErrorCode.NO_RECIPIENTS,
                    message="At least 1 recipient is needed",
                    field="recipients",
                )
            ]
        )
    try:
        await fetch_recipients(recipient_info, raise_exception=True)
    except (ValueError, TransportQueryError) as e:
        return ReportResponse(
            errors=[
                ReportError(
                    code=ReportErrorCode.NOT_FOUND,
                    message=str(e),
                    field="recipients",
                )
            ]
        )
    recipients = json.loads(recipient_info.json())

    filter_input = {}
    if input.filter:
        try:
            filter_input = json.loads(input.filter.filter_str)
        except JSONDecodeError:
            return ReportResponse(
                errors=[
                    ReportError(
                        code=ReportErrorCode.INVALID_FILTER,
                        message="Provided `filterStr` contains invalid JSON.",
                        field="filterStr",
                    )
                ]
            )

    column_info = input.columns.to_pydantic()
    if filter_input:
        try:
            await fetch_response(column_info, "", filter_input)
        except TransportQueryError as e:
            return ReportResponse(
                errors=[
                    ReportError(
                        code=ReportErrorCode.INVALID_FILTER,
                        message=str(e),
                        field="filterStr",
                    )
                ]
            )

    columns = json.loads(column_info.json())
    if report_id:
        report.name = input.name
        report.filter_input = filter_input
        report.columns = columns
        report.recipients = recipients
    else:
        report = Report(
            type=type,
            name=input.name,
            scope=ExportScopeEnum.FILTER,
            format=OutputFormatEnum.CSV,
            filter_input=filter_input,
            columns=columns,
            recipients=recipients,
        )
    db.add(report)
    await db.commit()
    return ReportResponse(report=report)


async def mutate_delete_report(root, info, report_id: int) -> DeleteReportResponse:
    db = info.context["db"]
    try:
        await fetch_report_by_id(db, report_id)
    except NoResultFound:
        return DeleteReportResponse(
            errors=[
                ReportError(
                    code=ReportErrorCode.NOT_FOUND,
                    message="Not found.",
                    field="reportId",
                )
            ]
        )
    await db.exec(delete(Job).where(Job.report_id == report_id))
    await db.exec(delete(Report).where(Report.id == report_id))
    await db.commit()
    return DeleteReportResponse()
