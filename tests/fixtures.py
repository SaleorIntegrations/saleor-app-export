import pytest

from app.core.reports.models import ExportFile, ExportFileTypesEnum


@pytest.fixture
async def report(db_session):
    instance = ExportFile(
        type=ExportFileTypesEnum.PRODUCTS,
        message="",
        content_file="",
    )
    db_session.add(instance)
    await db_session.commit()
    return instance
