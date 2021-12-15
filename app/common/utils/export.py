import secrets
from datetime import date, datetime
from tempfile import NamedTemporaryFile
from typing import IO, Any, Dict, List, Union
import os
import shutil

import petl as etl
from sqlalchemy import update
from saleor_app_base.database import get_db

from ...common.models import FileTypesEnum, ExportFile


BATCH_SIZE = 10000


# TODO add timezone?


def get_filename(model_name: str, file_type: str) -> str:
    hash = secrets.token_hex(nbytes=3)
    return "{}_data_{}_{}.{}".format(
        model_name, datetime.now().strftime("%d_%m_%Y_%H_%M_%S"), hash, file_type
    )


def parse_input(data: Any) -> Dict[str, Union[str, dict]]:
    """Parse input to correct data types, since scope coming from celery will be parsed to strings."""
    if "attributes" in data:
        serialized_attributes = []

        for attr in data.get("attributes") or []:
            if "date_time" in attr:
                if gte := attr["date_time"].get("gte"):
                    attr["date_time"]["gte"] = datetime.fromisoformat(gte)
                if lte := attr["date_time"].get("lte"):
                    attr["date_time"]["lte"] = datetime.fromisoformat(lte)

            if "date" in attr:
                if gte := attr["date"].get("gte"):
                    attr["date"]["gte"] = date.fromisoformat(gte)
                if lte := attr["date"].get("lte"):
                    attr["date"]["lte"] = date.fromisoformat(lte)

            serialized_attributes.append(attr)

        if serialized_attributes:
            data["attributes"] = serialized_attributes

    return data


def get_queryset_batches(queryset):
    """Slice a queryset into batches.

    Input queryset should be sorted be pk.
    """
    start_pk = 0
    end_pk = BATCH_SIZE

    while True:
        qs = queryset[start_pk:end_pk]

        if not qs:
            break

        yield qs

        start_pk += BATCH_SIZE
        end_pk += BATCH_SIZE


def create_file_with_headers(file_headers: List[str], delimiter: str, file_type: str):
    table = etl.wrap([file_headers])

    if file_type == FileTypesEnum.CSV.value:
        temp_file = NamedTemporaryFile("ab+", suffix=".csv")
        etl.tocsv(table, temp_file.name, delimiter=delimiter)
    else:
        temp_file = NamedTemporaryFile("ab+", suffix=".xlsx")
        etl.io.xlsx.toxlsx(table, temp_file.name)

    return temp_file


def append_to_file(
    export_data: List[Dict[str, Union[str, bool]]],
    headers: List[str],
    temporary_file: Any,
    file_type: str,
    delimiter: str,
):
    table = etl.fromdicts(export_data, header=headers, missing=" ")

    if file_type == FileTypesEnum.CSV.value:
        etl.io.csv.appendcsv(table, temporary_file.name, delimiter=delimiter)
    else:
        etl.io.xlsx.appendxlsx(table, temporary_file.name)


def save_csv_file_in_export_file(
    export_file: "ExportFile", temporary_file: IO[bytes], file_name: str
):
    file_path = os.path.join(os.getcwd(), file_name)
    shutil.copy(temporary_file.name, file_path)

    db = get_db()
    export_file = db.fetch_one(
        query=update(ExportFile.__table__)
        .where(ExportFile.id == export_file.get("id"))
        .values(content_file=file_path)
    )
