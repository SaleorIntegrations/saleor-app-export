from unittest import mock

import pytest
from sqlmodel import select

from app.core.reports.models import Job

MUTATION_RUN_REPORT = """
mutation RunReport($reportId: Int!) {
    runReport (reportId: $reportId) {
        job {
            id
            report {
                id
            }
        }
    }
}
"""


@pytest.mark.asyncio
@mock.patch("app.graphql.reports.mutations.job.start_job_for_report")
async def test_run_report_creates_job(m_task, db_session, graphql, orders_report):
    # given
    variables = {"reportId": orders_report.id}

    # when
    result = await graphql.execute(MUTATION_RUN_REPORT, variables)

    # then
    job = (
        await db_session.exec(select(Job).where(Job.report_id == orders_report.id))
    ).one()
    assert result["data"]["runReport"]["job"]["id"] == job.id
    assert result["data"]["runReport"]["job"]["report"]["id"] == orders_report.id
    m_task.delay.assert_called_once_with(job.id)


@pytest.mark.asyncio
@mock.patch("app.graphql.reports.mutations.job.start_job_for_report")
async def test_run_report_invalid_id(m_task, db_session, graphql, orders_report):
    # given
    variables = {"reportId": -1}

    # when
    result = await graphql.execute(MUTATION_RUN_REPORT, variables)
    # then

    assert result["data"]["runReport"]["job"] is None
    assert m_task.delay.call_count == 0
