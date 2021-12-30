from typing import Any, Callable, List, Tuple

from sqlmodel.ext.asyncio.session import AsyncSession

from app.core.export.fetch import fetch_export_by_id, fetch_report_by_id
from app.core.export.files import write_partial_result_to_file
from app.core.export.persist import create_export_file, update_export_cursor
from app.core.reports.models import Report


async def generic_init_export_for_report(
    db: AsyncSession,
    report_id: int,
    fetch_column_info: Callable[[Report], Any],
    get_headers: Callable[[Any], List[str]],
    fetch_response: Callable[[Any, str], dict],
    parse_response: Callable[[Any, dict], Tuple[dict, str]],
):
    """Initialize export for a report with given id."""
    report = await fetch_report_by_id(db, report_id)
    export_file = create_export_file(db, report_id)
    column_info = fetch_column_info(report)

    # Write report headers
    write_partial_result_to_file(
        export_file.content_file, [await get_headers(column_info)], reset=True
    )

    await db.commit()
    await generic_continue_export(
        db, export_file.id, fetch_column_info, fetch_response, parse_response
    )


async def _continue_export(
    db: AsyncSession,
    export_id: int,
    fetch_column_info: Callable[[Report], Any],
    fetch_response: Callable[[Any, str], Any],
    parse_response: Callable[[Any, dict], Tuple[dict, str]],
):
    """Use to unit test recursive function"""
    await generic_continue_export(
        db, export_id, fetch_column_info, fetch_response, parse_response
    )


async def generic_continue_export(
    db: AsyncSession,
    export_id: int,
    fetch_column_info: Callable[[Report], Any],
    fetch_response: Callable[[Any, str], dict],
    parse_response: Callable[[Any, dict], Tuple[dict, str]],
):
    """Export a single batch of a report and schedule the next one."""
    # Fetch database object and parse column info
    export_file = await fetch_export_by_id(db, export_id)
    report = await fetch_report_by_id(db, export_file.report_id)
    column_info = fetch_column_info(report)

    # Continue export from the last cursor
    response = await fetch_response(
        column_info,
        export_file.cursor,
    )
    result, cursor = parse_response(column_info, response)
    write_partial_result_to_file(export_file.content_file, result)
    update_export_cursor(db, export_file, cursor)
    await db.commit()

    # If next page exists, continue export
    if cursor:
        await _continue_export(
            db,
            export_id,
            fetch_column_info,
            fetch_response,
            parse_response,
        )
