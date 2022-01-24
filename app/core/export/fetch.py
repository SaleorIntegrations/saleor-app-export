import itertools
from typing import List

from sqlalchemy.ext.asyncio import AsyncSession
from sqlmodel import select

from app.core.export.builder import build_recipients_query
from app.core.export.executor import execute_query
from app.core.export.fields import RecipientInfo
from app.core.export.parse import parse_recipients_response
from app.core.reports.models import Job, Report


async def fetch_report_by_id(db: AsyncSession, pk: int) -> Report:
    result = await db.exec(select(Report).where(Report.id == pk))
    return result.one()


async def fetch_job_by_id(db: AsyncSession, pk: int) -> Job:
    result = await db.exec(select(Job).where(Job.id == pk))
    return result.one()


def fetch_recipients_info(report: Report) -> RecipientInfo:
    return RecipientInfo(**report.recipients)


async def fetch_recipients(
    recipient_info: RecipientInfo, raise_exception=False
) -> List[str]:
    pq = build_recipients_query(recipient_info)
    response = await execute_query(
        query=pq.query_str,
        variable_values=pq.variable_values,
    )

    user_map, group_map = parse_recipients_response(response)
    if raise_exception:
        for user_id in recipient_info.users:
            if user_id not in user_map:
                raise ValueError(f"Staff user with id {user_id} not found.")

        for group_id in recipient_info.permission_groups:
            if group_id not in group_map:
                raise ValueError(f"Permission group with id {group_id} not found.")

    return list(itertools.chain(*user_map.values(), *group_map.values()))
