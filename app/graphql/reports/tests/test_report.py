import pytest

QUERY_REPORTS = """
query {
    reports {
        id
    }
}
"""


@pytest.mark.asyncio
async def test_get_report(graphql, report):
    # when
    result = await graphql.execute(QUERY_REPORTS)
    # then
    assert result["data"]["reports"][0]["id"] == report.id
