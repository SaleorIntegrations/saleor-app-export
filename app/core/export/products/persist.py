from uuid import uuid4

from sqlmodel.ext.asyncio.session import AsyncSession

from app.core.reports.models import ExportFile


def create_export_file(
    db: AsyncSession,
    report_id: int,
):
    # Create a temporary file to keep partial results
    path = f"media/{report_id}-{uuid4()}.csv"  # TODO: use mounted volume
    # Create an export instance with an empty cursor
    export_file = ExportFile(
        report_id=report_id,
        message="",
        cursor="",
        content_file=path,
    )
    db.add(export_file)
    return export_file


def update_export_cursor(
    db: AsyncSession,
    export_file: ExportFile,
    cursor: str,
):
    export_file.cursor = cursor
    db.add(export_file)