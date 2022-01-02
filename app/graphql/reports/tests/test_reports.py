import pytest

QUERY_REPORTS = """
query {
    reports {
        edges {
            node {
                id
            }
        }
        totalCount
    }
}
"""


@pytest.mark.asyncio
async def test_get_reports(graphql, reports_factory):
    # given
    reports = await reports_factory(5)
    # when
    result = await graphql.execute(QUERY_REPORTS)
    # then
    assert result["data"]["reports"]["edges"][0]["node"]["id"] == reports[0].id
    assert result["data"]["reports"]["totalCount"] == 5
