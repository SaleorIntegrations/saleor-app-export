import json

import pytest

from app.core.export.products.fields import ProductFieldEnum, ProductSelectedColumnsInfo
from app.core.reports.models import (
    ExportFile,
    ExportObjectTypesEnum,
    ExportScopeEnum,
    Report,
)


@pytest.fixture
async def product_column_info(db_session):
    return ProductSelectedColumnsInfo(
        fields=[
            ProductFieldEnum.ID,
            ProductFieldEnum.NAME,
        ],
        attributes=[],
        channels=[],
        warehouses=[],
    )


@pytest.fixture
async def report(db_session, product_column_info):
    columns = json.loads(product_column_info.json())
    instance = Report(
        scope=ExportScopeEnum.ALL,
        type=ExportObjectTypesEnum.PRODUCTS,
        columns=columns,
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


@pytest.fixture
async def export(db_session, report):
    instance = ExportFile(
        report_id=report.id,
        content_file="media/test-export.csv",
        cursor="",
    )
    db_session.add(instance)
    await db_session.commit()
    return instance
