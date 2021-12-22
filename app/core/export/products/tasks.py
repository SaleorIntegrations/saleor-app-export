from typing import Dict, Union
import asyncio

from fastapi import Depends

from db import get_db
from app.core.reports.models import ExportFile
from app.core.common.tasks import on_task_failure, on_task_success
from app.celery import app
from .utils.export import export_products


@app.task(on_success=on_task_success, on_failure=on_task_failure)
async def export_products_task(
    report_id: int,
    scope: Dict[str, Union[str, dict]],
    export_info: Dict[str, list],
    file_type: str,
    delimiter: str = ";",
):
    db = Depends(get_db)
    export_file = ExportFile(report_id=report_id)
    db.add(export_file)
    db.commit()

    loop = asyncio.get_event_loop()
    coroutine = export_products(export_file, scope, export_info, file_type, delimiter)
    loop.run_until_complete(coroutine)
