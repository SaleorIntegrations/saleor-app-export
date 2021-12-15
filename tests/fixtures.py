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


@pytest.fixture
def reports_factory(db_session):
    async def factory(num_reports=3):
        instances = []
        for i in range(num_reports):
            instance = ExportFile(
                type=ExportFileTypesEnum.PRODUCTS,
                message="",
                content_file="",
            )
            db_session.add(instance)
            instances.append(instance)
        await db_session.commit()
        return instances

    return factory
