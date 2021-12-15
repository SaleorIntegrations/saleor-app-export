import datetime
import enum

from sqlalchemy import Table, Column, Integer, String, DateTime, Enum, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import as_declarative, declared_attr
from sqlalchemy.dialects.postgresql import JSONB


@as_declarative()
class BaseModel:
    __name__: str
    __table__: Table

    @declared_attr
    def __tablename__(self) -> str:
        return self.__name__.lower()


class JobStatusesEnum(str, enum.Enum):
    PENDING = "pending"
    SUCCESS = "success"
    FAILED = "failed"
    DELETED = "deleted"


class ExportFileTypesEnum(str, enum.Enum):
    PRODUCTS = "products"
    ORDERS = "orders"


class FileTypesEnum(str, enum.Enum):
    CSV = "csv"
    XLSX = "xlsx"


class ExportFile(BaseModel):

    id = Column(Integer, primary_key=True, autoincrement=True)
    status = Column(Enum(JobStatusesEnum), default=JobStatusesEnum.PENDING)
    type = Column(Enum(ExportFileTypesEnum))
    message = Column(String(255), default="")
    created_at = Column(DateTime(timezone=True), default=datetime.datetime.utcnow)
    updated_at = Column(
        DateTime(timezone=True),
        default=datetime.datetime.utcnow,
        onupdate=datetime.datetime.utcnow,
    )
    # TODO decide what to do with the USER
    user = Column(String(255), default="")
    # TODO find out how to handle files with SQLAlchemy
    content_file = Column(String(255), default="")
    events = relationship("ExportEvent", back_populates="export_file")

    __tablename__ = "export_file"


class ExportEventsEnum(str, enum.Enum):
    EXPORT_PENDING = "export_pending"
    EXPORT_SUCCESS = "export_success"
    EXPORT_FAILED = "export_failed"
    EXPORT_DELETED = "export_deleted"
    EXPORTED_FILE_SENT = "exported_file_sent"
    EXPORT_FAILED_INFO_SENT = "Export_failed_info_sent"


class ExportEvent(BaseModel):
    """Model used to store events that happened during the export file lifecycle."""

    id = Column(Integer, primary_key=True, autoincrement=True)
    date = Column(DateTime(timezone=True), default=datetime.datetime.utcnow)
    type = Column(Enum(ExportEventsEnum))
    parameters = Column(JSONB, default=dict)
    export_file_id = Column(Integer, ForeignKey("export_file.id"))
    export_file = relationship("ExportFile", back_populates="events")

    # TODO Do we really need this??? It's at least kept in the related model.
    user = Column(String(255), default="")

    __tablename__ = "export_event"
