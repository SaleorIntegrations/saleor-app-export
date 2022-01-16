import pytest
from sqlmodel import select

from app.core.reports.models import Job, Report

MUTATION_DELETE_REPORT = """
mutation DeleteReport($reportId: Int!) {
    deleteReport (reportId: $reportId) {
        errors {
            code
            message
            field
        }
    }
}
"""


@pytest.mark.asyncio
async def test_delete_report(
    db_session, graphql, orders_report, export_orders_job, products_report
):
    # given
    variables = {"reportId": orders_report.id}

    # when
    result = await graphql.execute(MUTATION_DELETE_REPORT, variables)

    # then
    assert result["data"]["deleteReport"]["errors"] == []
    assert (
        await db_session.exec(select(Report).where(Report.id == orders_report.id))
    ).first() is None
    assert (
        await db_session.exec(select(Job).where(Job.report_id == orders_report.id))
    ).first() is None
    assert (
        await db_session.exec(select(Job).where(Job.report_id == products_report.id))
    ).first() is None


@pytest.mark.asyncio
async def test_delete_not_found(db_session, graphql):
    # given
    variables = {"reportId": -1}

    # when
    result = await graphql.execute(MUTATION_DELETE_REPORT, variables)

    # then
    error = result["data"]["deleteReport"]["errors"][0]
    assert error["code"] == "NOT_FOUND"
    assert error["field"] == "reportId"
