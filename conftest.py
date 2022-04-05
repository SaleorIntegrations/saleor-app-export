import asyncio
from typing import Generator

import pytest  # noqa
from httpx import AsyncClient
from saleor_app_base.core import context
from saleor_app_base.core.context import init
from saleor_app_base.core.tenant_settings import TenantContext
from saleor_app_base.tests.fixtures import *  # noqa
from sqlalchemy.ext.asyncio import create_async_engine
from sqlmodel import SQLModel
from sqlmodel.ext.asyncio.session import AsyncSession
from testing.postgresql import Postgresql

from db import async_session, get_db
from main import app as fastapi_app
from tests.fixtures import *  # noqa


@pytest.fixture(scope="session")
def event_loop(request) -> Generator:
    """Create an instance of the default event loop for each test case."""
    loop = asyncio.get_event_loop_policy().new_event_loop()
    yield loop
    loop.close()


@pytest.fixture()
async def db_session() -> AsyncSession:
    tempdb = Postgresql()
    engine = create_async_engine(
        tempdb.url().replace("postgresql://", "postgresql+asyncpg://")
    )
    async with engine.begin() as connection:
        await connection.run_sync(SQLModel.metadata.drop_all)
        await connection.run_sync(SQLModel.metadata.create_all)
        async with async_session(bind=connection) as session:
            yield session
            await session.flush()
            await session.rollback()


@pytest.fixture()
def override_get_db(db_session: AsyncSession):
    async def _override_get_db():
        yield db_session

    return _override_get_db


@pytest.fixture
def fastapi(override_get_db):
    fastapi_app.dependency_overrides[get_db] = override_get_db
    return fastapi_app


@pytest.fixture
async def async_client(fastapi):
    async with AsyncClient(app=fastapi, base_url="http://test") as ac:
        yield ac


@pytest.fixture
async def tenant(db_session, x_saleor_token, x_saleor_domain):
    tenant = TenantModel(
        # General settings
        domain=x_saleor_domain,
        tenant_id=uuid4().hex,
        data={},
        saleor_token=x_saleor_token,
        secret_key="",
    )
    db_session.add(tenant)
    return tenant


@pytest.fixture
def mock_verify():
    with mock.patch("saleor_app_base.sdk.saleor.verify_token") as m:
        m.return_value = True
        yield m


@pytest.fixture
def graphql(async_client, tenant, x_saleor_domain, x_saleor_token, mock_verify):
    class GqlClient:
        async def execute(self, query, variables=None):
            # Prepare request arguments
            json = {"query": query}
            if variables is not None:
                json["variables"] = variables
            kwargs = dict(
                url="/v1/graphql",
                json=json,
            )
            # Test unauthenticated request
            response = await async_client.post(
                **kwargs,
            )
            assert response.status_code == 422
            # Test authenticated requeset
            response = await async_client.post(
                **kwargs,
                headers={
                    "x-saleor-domain": x_saleor_domain,
                    "x-saleor-token": x_saleor_token,
                },
            )
            return response.json()

    return GqlClient()


@pytest.fixture
def tenant_id(db_session, x_saleor_token, x_saleor_domain, tenant):
    context._tenant_context.set(TenantContext(tenant=tenant))
    return tenant.tenant_id