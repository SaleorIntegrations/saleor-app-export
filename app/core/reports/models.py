import enum
from datetime import datetime
from typing import Optional

from pydantic import constr
from sqlalchemy import JSON, Column
from sqlmodel import Field, SQLModel


class JobStatusesEnum(str, enum.Enum):
    PENDING = "pending"
    SUCCESS = "success"
    FAILED = "failed"
    DELETED = "deleted"


class ExportObjectTypesEnum(str, enum.Enum):
    PRODUCTS = "products"
    ORDERS = "orders"


class OutputFormatEnum(str, enum.Enum):
    CSV = "csv"
    XLSX = "xlsx"


class ExportScopeEnum(str, enum.Enum):
    ALL = "ALL"
    FILTER = "FILTER"


class Report(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    name: constr(max_length=255) = Field(default="")
    scope: ExportScopeEnum
    type: ExportObjectTypesEnum
    format: OutputFormatEnum
    filter_input: dict = Field(sa_column=Column(JSON), default_factory=dict)
    columns: dict = Field(sa_column=Column(JSON), default_factory=dict)
    recipients: dict = Field(sa_column=Column(JSON), default_factory=dict)
    domain: constr(max_length=255) = Field(default="", index=True)


class Job(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    status: JobStatusesEnum = Field(default=JobStatusesEnum.PENDING)
    content_file: constr(max_length=255) = Field(default="")
    cursor: constr(max_length=255) = Field(default="")
    report_id: int = Field(foreign_key="report.id")
