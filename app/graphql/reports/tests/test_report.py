import pytest

QUERY_REPORT = """
query Report($id: Int!) {
  report (id: $id) {
    id
    type
    filter
    columns {
      __typename
      ... on ProductSelectedColumnsInfo {
        productFields: fields
        warehouses
        attributes
        channels
      }
      ... on OrderSelectedColumnsInfo {
        orderFields: fields
      }
    }
  }
}
"""


@pytest.mark.asyncio
async def test_get_orders_report(graphql, orders_report, order_column_info):
    # when
    result = await graphql.execute(QUERY_REPORT, {"id": orders_report.id})

    # then
    assert result["data"]["report"]["id"] == orders_report.id
    assert result["data"]["report"]["type"] == orders_report.type.name
    assert result["data"]["report"]["filter"] is None
    assert (
        result["data"]["report"]["columns"]["__typename"] == "OrderSelectedColumnsInfo"
    )
    assert result["data"]["report"]["columns"]["orderFields"] == [
        f.name for f in order_column_info.fields
    ]


@pytest.mark.asyncio
async def test_get_products_report(graphql, products_report, product_column_info):
    # when
    result = await graphql.execute(QUERY_REPORT, {"id": products_report.id})

    # then
    assert result["data"]["report"]["id"] == products_report.id
    assert result["data"]["report"]["type"] == products_report.type.name
    assert result["data"]["report"]["filter"] is None
    assert (
        result["data"]["report"]["columns"]["__typename"]
        == "ProductSelectedColumnsInfo"
    )
    assert result["data"]["report"]["columns"]["productFields"] == [
        f.name for f in product_column_info.fields
    ]


@pytest.mark.asyncio
async def test_get_report_does_not_exist(graphql, orders_report):
    # when
    result = await graphql.execute(QUERY_REPORT, {"id": -1})

    # then
    assert result["data"]["report"] is None
