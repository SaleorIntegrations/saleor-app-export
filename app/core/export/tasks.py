import dataclasses
from typing import Any, Awaitable, Callable, List, Tuple

from sqlmodel.ext.asyncio.session import AsyncSession

from app.celery import database_task
from app.core.export.fetch import fetch_job_by_id, fetch_report_by_id
from app.core.export.files import write_partial_result_to_file
from app.core.export.persist import update_job_cursor
from app.core.reports.models import ExportObjectTypesEnum, Report


@dataclasses.dataclass
class ExportMethods:
    fetch_column_info: Callable[[Report], Any]
    get_headers: Callable[[Any], Awaitable[List[str]]]
    fetch_response: Callable[[Any, str, dict], Awaitable[dict]]
    parse_response: Callable[[Any, dict], Tuple[List[List[str]], str]]


def get_methods(report: Report) -> ExportMethods:
    from app.core.export.orders.tasks import OrderExportMethods
    from app.core.export.products.tasks import ProductExportMethods

    return {
        ExportObjectTypesEnum.ORDERS: OrderExportMethods,
        ExportObjectTypesEnum.PRODUCTS: ProductExportMethods,
    }.get(report.type)


@database_task
async def start_job_for_report(
    db: AsyncSession,
    job_id: int,
):
    """Initialize export for a report with given id."""
    job = await fetch_job_by_id(db, job_id)
    report = await fetch_report_by_id(db, job.report_id)
    methods = get_methods(report)
    column_info = methods.fetch_column_info(report)

    # Write report headers
    write_partial_result_to_file(
        job.content_file, [await methods.get_headers(column_info)], reset=True
    )

    await db.commit()
    continue_job.delay(job.id)


async def _continue_job(
    job_id: int,
):
    """Use to unit test recursive function"""
    continue_job.delay(job_id)


@database_task
async def continue_job(
    db: AsyncSession,
    job_id: int,
):
    """Export a single batch of a report and schedule the next one."""
    # Fetch database object and parse column info
    job = await fetch_job_by_id(db, job_id)
    report = await fetch_report_by_id(db, job.report_id)
    methods = get_methods(report)
    column_info = methods.fetch_column_info(report)

    # Continue export from the last cursor
    response = await methods.fetch_response(
        column_info,
        job.cursor,
        report.filter_input,
    )
    result, cursor = methods.parse_response(column_info, response)
    write_partial_result_to_file(job.content_file, result)
    await update_job_cursor(db, job, cursor)

    # If next page exists, continue export
    if cursor:
        await _continue_job(job_id)
