import pytest

QUERY_REPORT = """
query Report($id: Int!) {
  report (id: $id) {
    id
    type
  }
}
"""


@pytest.mark.asyncio
async def test_get_report(graphql, orders_report):
    # when
    result = await graphql.execute(QUERY_REPORT, {"id": orders_report.id})

    # then
    assert result["data"]["report"]["id"] == orders_report.id
    assert result["data"]["report"]["type"] == orders_report.type.name


@pytest.mark.asyncio
async def test_get_report_does_not_exist(graphql, orders_report):
    # when
    result = await graphql.execute(QUERY_REPORT, {"id": -1})

    # then
    assert result["data"]["report"] is None
