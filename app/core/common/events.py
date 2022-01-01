from typing import TYPE_CHECKING

from app.core.reports.models import ExportEvent, ExportEventsEnum
from db import get_db

if TYPE_CHECKING:
    from app.core.reports.models import ExportFile


def export_started_event(*, export_file: "ExportFile"):
    db_generator = get_db()
    db = db_generator.__anext__()
    db.add(
        ExportEvent(
            export_file_id=export_file.id,
            type=ExportEventsEnum.EXPORT_PENDING,
        )
    )
    db.commit()


def export_success_event(
    *,
    export_file: "ExportFile",
):
    db_generator = get_db()
    db = db_generator.__anext__()
    db.add(
        ExportEvent(
            export_file_id=export_file.id,
            type=ExportEventsEnum.EXPORT_SUCCESS,
        )
    )
    db.commit()


def export_failed_event(
    *,
    export_file: "ExportFile",
    message: str,
    error_type: str,
):
    db_generator = get_db()
    db = db_generator.__anext__()
    db.add(
        ExportEvent(
            export_file_id=export_file.id,
            type=ExportEventsEnum.EXPORT_FAILED,
            parameters={"message": message, "error_type": error_type},
        )
    )
    db.commit()


def export_deleted_event(
    *,
    export_file: "ExportFile",
):
    db_generator = get_db()
    db = db_generator.__anext__()
    db.add(
        ExportEvent(export_file_id=export_file.id, type=ExportEventsEnum.EXPORT_DELETED)
    )
    db.commit()


def export_file_sent_event(*, export_file_id: int):
    db_generator = get_db()
    db = db_generator.__anext__()
    db.add(
        ExportEvent(
            export_file_id=export_file_id,
            type=ExportEventsEnum.EXPORTED_FILE_SENT,
        )
    )
    db.commit()


def export_failed_info_sent_event(*, export_file_id: int, user_id: int):
    db_generator = get_db()
    db = db_generator.__anext__()
    db.add(
        ExportEvent(
            export_file_id=export_file_id,
            type=ExportEventsEnum.EXPORT_FAILED_INFO_SENT,
        )
    )
    db.commit()