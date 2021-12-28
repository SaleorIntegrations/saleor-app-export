import asyncio
from typing import Generator

import pytest  # noqa
from httpx import AsyncClient
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
    async def _override_get_db(get_db):
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
def graphql(async_client):
    class GqlClient:
        async def execute(self, query, variables=None):
            json = {"query": query}
            if variables is not None:
                json["variables"] = variables
            response = await async_client.post("/graphql", json=json)
            return response.json()

    return GqlClient()
