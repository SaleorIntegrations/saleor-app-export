import pytest

from app.core.reports.models import ExportObjectTypesEnum, ExportScopeEnum, Report


@pytest.fixture
async def report(db_session):
    instance = Report(
        scope=ExportScopeEnum.ALL,
        type=ExportObjectTypesEnum.ORDERS,
    )
    db_session.add(instance)
    await db_session.commit()
    return instance


@pytest.fixture
def reports_factory(db_session):
    async def factory(num_reports=3):
        instances = []
        for i in range(num_reports):
            instance = Report(
                scope=ExportScopeEnum.ALL,
                type=ExportObjectTypesEnum.ORDERS,
            )
            db_session.add(instance)
            instances.append(instance)
        await db_session.commit()
        return instances

    return factory
