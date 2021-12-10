from fastapi import Depends
from databases import Database
from saleor_app_base.database import get_db
from sqlalchemy.dialects.postgresql import insert
from sqlalchemy import select

from ..router import router
from ..common.models import ExportFile, ExportFileTypesEnum
from .tasks import export_products_task


@router.post("/export/products/")
async def export_products(
    db: Database = Depends(get_db),
):
    values = {"type": ExportFileTypesEnum.PRODUCTS.value()}
    file = await db.fetch_one(
        query=insert(ExportFile.__table__)
        .values(**values)
        .returning(ExportFile.__table__)
    )
    # TODO update the arguments
    export_products_task.delay(file.id, {}, {}, "csv")
    return {"status": "ok"}


@router.get("/export/products/file/{file_id}/")
async def get_export_file(
    file_id: int,
    db: Database = Depends(get_db),
):
    export_file = await db.fetch_one(
        query=select(ExportFile.__table__)
        .where(ExportFile.id == file_id)
        .returning(ExportFile.__table__)
    )

    return {"status": "ok", "export_file": export_file.content_file}
