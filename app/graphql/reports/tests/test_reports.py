import pytest

QUERY_REPORTS = """
query Reports($first: Int!, $after: String) {
    reports(first: $first, after: $after) {
        edges {
            node {
                id
            }
        }
        pageInfo {
            endCursor
            hasNext
        }
        totalCount
    }
}
"""


@pytest.mark.asyncio
@pytest.mark.parametrize("first,has_next", [(9, True), (10, False)])
async def test_get_reports_paginate_has_next(graphql, reports_factory, first, has_next):
    # given
    reports = await reports_factory(10)

    # when
    result = await graphql.execute(QUERY_REPORTS, {"first": first})

    # then
    assert result["data"]["reports"]["edges"][0]["node"]["id"] == reports[0].id
    assert result["data"]["reports"]["totalCount"] == 10
    assert result["data"]["reports"]["pageInfo"]["hasNext"] == has_next


@pytest.mark.asyncio
async def test_get_reports_paginate_cursor(graphql, reports_factory):
    # given
    await reports_factory(10)

    # when
    page_1 = await graphql.execute(QUERY_REPORTS, {"first": 5})
    cursor = page_1["data"]["reports"]["pageInfo"]["endCursor"]
    page_2 = await graphql.execute(QUERY_REPORTS, {"first": 5, "after": cursor})

    # then
    assert page_1["data"]["reports"]["pageInfo"]["hasNext"] is True
    assert page_2["data"]["reports"]["pageInfo"]["hasNext"] is False


@pytest.mark.asyncio
async def test_get_reports_empty_page(graphql, reports_factory):
    # when
    response = await graphql.execute(QUERY_REPORTS, {"first": 100})

    # then
    assert response["data"]["reports"]["pageInfo"]["hasNext"] is False
    assert response["data"]["reports"]["pageInfo"]["endCursor"] is None


@pytest.mark.asyncio
async def test_get_reports_max_page_size_exceeded(graphql, reports_factory):
    # when
    response = await graphql.execute(QUERY_REPORTS, {"first": 101})

    # then
    assert response["errors"]
