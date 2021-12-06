from typing import Dict, Union

from sqlalchemy import select

from ...celery import app
from ..common.models import ExportFile
from ..common.tasks import on_task_success, on_task_failure
from .utils.export import export_products


@app.task(on_success=on_task_success, on_failure=on_task_failure)
def export_products_task(
    export_file_id: int,
    scope: Dict[str, Union[str, dict]],
    export_info: Dict[str, list],
    file_type: str,
    delimiter: str = ";",
):
    query = select(ExportFile).where(ExportFile.id == export_file_id)
    export_file = "execute(query)"
    export_products(export_file, scope, export_info, file_type, delimiter)
