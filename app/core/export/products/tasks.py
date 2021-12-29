from sqlmodel.ext.asyncio.session import AsyncSession

from app.core.export.products.fetch import (
    fetch_export_by_id,
    fetch_products_response,
    fetch_report_by_id,
)
from app.core.export.products.files import write_partial_result_to_file
from app.core.export.products.parse import parse_variants_response
from app.core.export.products.persist import create_export_file, update_export_cursor


async def init_export_for_report(
    db: AsyncSession,
    report_id: int,
):
    """Initialize export for a report with given id."""
    # report = await fetch_report_by_id(db, report_id)
    export_file = create_export_file(db, report_id)

    # Write report headers
    with open(export_file.content_file, "w") as f:
        print("headers", file=f)  # TODO: write actual headers

    await db.commit()
    await continue_export(db, export_file.id)


async def continue_export(
    db: AsyncSession,
    export_id: int,
):
    """Export a single batch of a report and schedule the next one."""
    return
    export_file = await fetch_export_by_id(db, export_id)
    report = await fetch_report_by_id(db, export_file.report_id)
    response = await fetch_products_response(
        report.scope,
        export_file.cursor,
    )
    cols, cursor = parse_variants_response(report.scope, response)
    # TODO: delimiter
    write_partial_result_to_file(export_file.content_file, cols)
    update_export_cursor(db, export_file, cursor)
    await db.commit()
    await continue_export(db, export_file.id)
