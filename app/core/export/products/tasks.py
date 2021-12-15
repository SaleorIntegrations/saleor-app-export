from typing import Dict, Union
import asyncio

from saleor_app_base.database import get_db
from sqlalchemy import select

from app.core.reports.models import ExportFile

from .utils.export import export_products


@app.task(on_success=on_task_success, on_failure=on_task_failure)
def export_products_task(
    export_file_id: int,
    scope: Dict[str, Union[str, dict]],
    export_info: Dict[str, list],
    file_type: str,
    delimiter: str = ";",
):
    db = get_db()
    export_file = db.fetch_one(
        query=select(ExportFile.__table__.columns).where(
            ExportFile.id == export_file_id
        )
    )

    loop = asyncio.get_event_loop()
    coroutine = export_products(export_file, scope, export_info, file_type, delimiter)
    loop.run_until_complete(coroutine)
