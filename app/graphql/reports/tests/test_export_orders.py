import pytest

from app.core.reports.models import ExportObjectTypesEnum

MUTATION_EXPORT_ORDERS = """
mutation OrdersExport($input: ExportOrdersInput!) {
    exportOrders (input: $input) {
        __typename
        ...  on Report {
            id
            type
        }
        ... on  ExportErrorResponse{
            code
            message
            field
        }
    }
}
"""


@pytest.mark.asyncio
async def test_export_orders_schedules_task(graphql):
    # given
    variables = {
        "input": {
            "exportInfo": {
                "fields": ["FIELD1", "FIELD2"],
                "fileType": "CSV",
                "scope": "ALL",
                "filter": "",
                "ids": [],
            }
        }
    }
    # when
    result = await graphql.execute(MUTATION_EXPORT_ORDERS, variables)
    # then
    assert result["data"]["exportOrders"]["type"] == ExportObjectTypesEnum.ORDERS.name
