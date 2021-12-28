from uuid import uuid4

from sqlmodel.ext.asyncio.session import AsyncSession

from app.core.reports.models import ExportFile


async def init_export_for_report(
    db: AsyncSession,
    report_id: int,
):
    """Initialize export for a report with given id."""
    # Create a temporary file to keep partial results
    path = f"media/{report_id}-{uuid4()}.csv"  # TODO: use mounted volume
    file = open(path, "w")
    # Write report headers
    print("headers", file=file)  # TODO: write actual headers
    # Create an export instance with an empty cursor
    export_file = ExportFile(
        report_id=report_id,
        message="",
        cursor="",
        content_file=path,
    )
    db.add(export_file)
    await db.commit()
    # await export_products(export_file)
    file.close()
