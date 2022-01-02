import json

import pytest

from app.core.export.orders.fields import OrderFieldEnum, OrderSelectedColumnsInfo
from app.core.export.products.fields import ProductFieldEnum, ProductSelectedColumnsInfo
from app.core.reports.models import ExportObjectTypesEnum, ExportScopeEnum, Job, Report


@pytest.fixture
async def product_column_info():
    return ProductSelectedColumnsInfo(
        fields=list(ProductFieldEnum),
        attributes=[
            "QXR0cmlidXRlOjE1",
            "QXR0cmlidXRlOjEz",
        ],
        channels=[
            "Q2hhbm5lbDoy",
        ],
        warehouses=["V2FyZWhvdXNlOjJjYzE5MmVlLTcyNWQtNGZjMC1iN2Y4LThkZmM0MDBjNzQ5NQ=="],
    )


@pytest.fixture
async def order_column_info():
    return OrderSelectedColumnsInfo(
        fields=list(OrderFieldEnum),
    )


@pytest.fixture
async def products_report(db_session, product_column_info):
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
async def orders_report(db_session, order_column_info):
    columns = json.loads(order_column_info.json())
    instance = Report(
        scope=ExportScopeEnum.ALL,
        type=ExportObjectTypesEnum.ORDERS,
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
async def export_products_jobs(db_session, products_report):
    instance = Job(
        report_id=products_report.id,
        content_file="media/test-product-export.csv",
        cursor="",
    )
    db_session.add(instance)
    await db_session.commit()
    return instance


@pytest.fixture
async def export_orders_job(db_session, orders_report):
    instance = Job(
        report_id=orders_report.id,
        content_file="media/test-order-export.csv",
        cursor="",
    )
    db_session.add(instance)
    await db_session.commit()
    return instance
