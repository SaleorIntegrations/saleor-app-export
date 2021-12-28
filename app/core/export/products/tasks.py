from typing import TYPE_CHECKING, Dict, Union

from app.core.reports.models import ExportFile
from db import get_db

from .utils.export import export_products

if TYPE_CHECKING:
    from app.graphql.reports.mutations.products import ExportInfoInput


async def export_products_task(
    report_id: int,
    scope: Dict[str, Union[str, dict]],
    export_info: "ExportInfoInput",
    file_type: str,
    delimiter: str = ";",
):
    db_generator = get_db()
    db = await db_generator.__anext__()
    export_file = ExportFile(report_id=report_id, message="What is the message for?")
    db.add(export_file)
    await db.commit()
    await export_products(export_file, scope, export_info, file_type, delimiter)
