from typing import List

from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession

from app.core.reports.models import ExportFile
from app.graphql.reports.types import Report


async def resolve_reports(db: AsyncSession) -> List[Report]:
    return await db.exec(select(ExportFile))
