from typing import Dict, Union, TYPE_CHECKING
import asyncio

from db import get_db
from app.core.reports.models import ExportFile
from app.core.common.tasks import on_task_failure, on_task_success
from app.celery import app
from .utils.export import export_products

if TYPE_CHECKING:
    from app.graphql.reports.mutations.products import ExportInfoInput


# @app.task(on_success=on_task_success, on_failure=on_task_failure)
async def export_products_task(
    report_id: int,
    scope: Dict[str, Union[str, dict]],
    export_info: "ExportInfoInput",
    file_type: str,
    delimiter: str = ";",
):
    db_generator = get_db()
    db = db_generator.__anext__()
    export_file = ExportFile(report_id=report_id, message="What is the message for?")
    db.add(export_file)
    await db.commit()
    await export_products(export_file, scope, export_info, file_type, delimiter)
    # loop = asyncio.get_event_loop()
    # coroutine = export_products(export_file, scope, export_info, file_type, delimiter)
    # loop.run_until_complete(coroutine)
