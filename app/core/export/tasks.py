import dataclasses
from typing import Any, Awaitable, Callable, List, Tuple

from sqlmodel.ext.asyncio.session import AsyncSession

from app.celery import celery
from app.core.export.fetch import fetch_export_by_id, fetch_report_by_id
from app.core.export.files import write_partial_result_to_file
from app.core.export.persist import create_export_file, update_export_cursor
from app.core.reports.models import ExportObjectTypesEnum, Report


@dataclasses.dataclass
class ExportMethods:
    fetch_column_info: Callable[[Report], Any]
    get_headers: Callable[[Any], Awaitable[List[str]]]
    fetch_response: Callable[[Any, str], Awaitable[dict]]
    parse_response: Callable[[Any, dict], Tuple[List[List[str]], str]]


def get_methods(report: Report) -> ExportMethods:
    from app.core.export.orders.tasks import OrderExportMethods
    from app.core.export.products.tasks import ProductExportMethods

    return {
        ExportObjectTypesEnum.ORDERS: OrderExportMethods,
        ExportObjectTypesEnum.PRODUCTS: ProductExportMethods,
    }.get(report.type)


@celery.task(typing=False)
async def init_export_for_report(
    db: AsyncSession,
    report_id: int,
):
    init_export_for_report.apply_async([report_id], countdown=5)
    """Initialize export for a report with given id."""
    report = await fetch_report_by_id(db, report_id)
    methods = get_methods(report)
    export_file = create_export_file(db, report_id)
    column_info = methods.fetch_column_infqo(report)

    # Write report headers
    write_partial_result_to_file(
        export_file.content_file, [await methods.get_headers(column_info)], reset=True
    )

    await db.commit()
    continue_export.delay(export_file.id)


async def _continue_export(
    db: AsyncSession,
    export_id: int,
):
    """Use to unit test recursive function"""
    continue_export.delay(export_id)


@celery.task(typing=False)
async def continue_export(
    db: AsyncSession,
    export_id: int,
):
    """Export a single batch of a report and schedule the next one."""
    # Fetch database object and parse column info
    export_file = await fetch_export_by_id(db, export_id)
    report = await fetch_report_by_id(db, export_file.report_id)
    methods = get_methods(report)
    column_info = methods.fetch_column_info(report)

    # Continue export from the last cursor
    response = await methods.fetch_response(
        column_info,
        export_file.cursor,
    )
    result, cursor = methods.parse_response(column_info, response)
    write_partial_result_to_file(export_file.content_file, result)
    update_export_cursor(db, export_file, cursor)
    await db.commit()

    # If next page exists, continue export
    if cursor:
        await _continue_export(db, export_id)
