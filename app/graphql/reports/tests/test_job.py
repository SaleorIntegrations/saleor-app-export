import pytest

QUERY_JOB = """
query Job($id: Int!) {
  job (id: $id) {
    id
    createdAt
    report {
      id
      type
    }
  }
}
"""


@pytest.mark.asyncio
async def test_get_job(graphql, export_orders_job):
    # when
    result = await graphql.execute(QUERY_JOB, {"id": export_orders_job.id})

    # then
    assert result["data"]["job"]["id"] == export_orders_job.id
    assert result["data"]["job"]["report"]["id"] == export_orders_job.report_id
    assert result["data"]["job"]["report"]["type"] == "ORDERS"


@pytest.mark.asyncio
async def test_get_job_does_not_exist(graphql, orders_report):
    # when
    result = await graphql.execute(QUERY_JOB, {"id": -1})

    # then
    assert result["data"]["job"] is None
