from typing import Dict, Union

from sqlalchemy import select
from saleor_app_base.database import get_db

from ..celery import app
from ..common.models import ExportFile
from ..common.tasks import on_task_success, on_task_failure
from .utils.export import export_products


# TODO Convert to the task after the demo
# @app.task(on_success=on_task_success, on_failure=on_task_failure)
async def export_products_task(
    export_file_id: int,
    scope: Dict[str, Union[str, dict]],
    export_info: Dict[str, list],
    file_type: str,
    delimiter: str = ";",
):
    db = get_db()
    export_file = await db.fetch_one(
        query=select(ExportFile.__table__.columns).where(
            ExportFile.id == export_file_id
        )
    )
    await export_products(export_file, scope, export_info, file_type, delimiter)
