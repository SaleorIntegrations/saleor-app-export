from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy.orm import sessionmaker
from sqlmodel.ext.asyncio.session import AsyncSession
from saleor_app_base.core.app_settings import app_settings


engine = create_async_engine(app_settings.SQLALCHEMY_DB_URI)
async_session = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)


async def Depends(get_db) -> AsyncSession:
    """
    Dependency function that yields db sessions
    """
    async with async_session() as session:
        yield session
        await session.commit()
