from sqlmodel.ext.asyncio.session import AsyncSession

from app.core.reports.models import ExportFile


async def export_orders(
    db: AsyncSession,
    export_file_id: int,
):
    # Fetch export file
    export_file = await db.get(ExportFile, export_file_id)
    # Fetch report
    ...
    # Export batch
    await export_batch(db, export_file)


async def export_batch(
    db: AsyncSession,
    export_file: ExportFile,
):
    pass
