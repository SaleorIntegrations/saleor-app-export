from typing import TYPE_CHECKING

from saleor_app_base.database import get_db
from sqlalchemy.dialects.postgresql import insert

from .models import ExportEvent, ExportEventsEnum

if TYPE_CHECKING:
    from .models import ExportFile


def export_started_event(*, export_file: "ExportFile"):

    db = get_db()
    db.fetch_one(
        query=insert(ExportEvent.__table__).values(
            export_file=export_file, type=ExportEventsEnum.EXPORT_PENDING.value()
        )
    )


def export_success_event(
    *,
    export_file: "ExportFile",
):
    db = get_db()
    db.fetch_one(
        query=insert(ExportEvent.__table__).values(
            export_file=export_file, type=ExportEventsEnum.EXPORT_SUCCESS.value()
        )
    )


def export_failed_event(
    *,
    export_file: "ExportFile",
    message: str,
    error_type: str,
):
    db = get_db()
    db.fetch_one(
        query=insert(ExportEvent.__table__).values(
            export_file=export_file,
            type=ExportEventsEnum.EXPORT_FAILED.value(),
            parameters={"message": message, "error_type": error_type},
        )
    )


def export_deleted_event(
    *,
    export_file: "ExportFile",
):
    db = get_db()
    db.fetch_one(
        query=insert(ExportEvent.__table__).values(
            export_file=export_file, type=ExportEventsEnum.EXPORT_DELETED.value()
        )
    )


def export_file_sent_event(*, export_file_id: int):
    db = get_db()
    db.fetch_one(
        query=insert(ExportEvent.__table__).values(
            export_file_id=export_file_id,
            type=ExportEventsEnum.EXPORTED_FILE_SENT.value(),
        )
    )


def export_failed_info_sent_event(*, export_file_id: int, user_id: int):
    db = get_db()
    db.fetch_one(
        query=insert(ExportEvent.__table__).values(
            export_file_id=export_file_id,
            type=ExportEventsEnum.EXPORT_FAILED_INFO_SENT.value(),
        )
    )
