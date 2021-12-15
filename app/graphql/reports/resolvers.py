from typing import List

from sqlalchemy.ext.asyncio import AsyncSession

from app.graphql.reports.types import Report


async def resolve_reports(db: AsyncSession) -> List[Report]:
    return []
