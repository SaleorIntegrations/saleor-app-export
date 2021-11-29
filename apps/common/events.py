from typing import TYPE_CHECKING, Optional

from . import ExportEvents
from .models import ExportEvent

if TYPE_CHECKING:
    from ..account.models import User
    from ..app.models import App
    from .models import ExportFile


# TODO refactore APP and USER


UserType = Optional["User"]
AppType = Optional["App"]


def export_started_event(
    *, export_file: "ExportFile", user: UserType = None, app: AppType = None
):
    event = ExportEvent(
        export_file=export_file, user=user, app=app, type=ExportEvents.EXPORT_PENDING
    )
    # TODO Commit to DB


def export_success_event(
    *, export_file: "ExportFile", user: UserType = None, app: AppType = None
):
    event = ExportEvent(
        export_file=export_file, user=user, app=app, type=ExportEvents.EXPORT_SUCCESS
    )
    # TODO Commit to DB


def export_failed_event(
    *,
    export_file: "ExportFile",
    user: UserType = None,
    app: AppType = None,
    message: str,
    error_type: str
):
    event = ExportEvent(
        export_file=export_file,
        user=user,
        app=app,
        type=ExportEvents.EXPORT_FAILED,
        parameters={"message": message, "error_type": error_type},
    )
    # TODO Commit to DB


def export_deleted_event(
    *, export_file: "ExportFile", user: UserType = None, app: AppType = None
):
    event = ExportEvent(
        export_file=export_file, user=user, app=app, type=ExportEvents.EXPORT_DELETED
    )
    # TODO Commit to DB


def export_file_sent_event(*, export_file_id: int, user_id: int):
    event = ExportEvent(
        export_file_id=export_file_id,
        user_id=user_id,
        type=ExportEvents.EXPORTED_FILE_SENT,
    )
    # TODO Commit to DB


def export_failed_info_sent_event(*, export_file_id: int, user_id: int):
    event = ExportEvent(
        export_file_id=export_file_id,
        user_id=user_id,
        type=ExportEvents.EXPORT_FAILED_INFO_SENT,
    )
    # TODO Commit to DB
