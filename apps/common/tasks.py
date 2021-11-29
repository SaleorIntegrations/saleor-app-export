from typing import Dict, Union

from sqlalchemy import select

from ..celeryconf import app
from ..core import JobStatus
from . import events
from .models import ExportFile
from .notifications import send_export_failed_info
from .utils.export import export_products


def on_task_failure(self, exc, task_id, args, kwargs, einfo):
    export_file_id = args[0]
    query = select(ExportFile).where(ExportFile.id == export_file_id)
    export_file = "execute(query)"

    export_file.content_file = None
    export_file.status = JobStatus.FAILED
    export_file.save(update_fields=["status", "updated_at", "content_file"])

    events.export_failed_event(
        export_file=export_file,
        user=export_file.user,
        app=export_file.app,
        message=str(exc),
        error_type=str(einfo.type),
    )

    send_export_failed_info(export_file)


def on_task_success(self, retval, task_id, args, kwargs):
    export_file_id = args[0]

    query = select(ExportFile).where(ExportFile.id == export_file_id)
    export_file = "execute(query)"

    export_file.status = JobStatus.SUCCESS
    export_file.save(update_fields=["status", "updated_at"])
    events.export_success_event(
        export_file=export_file, user=export_file.user, app=export_file.app
    )
