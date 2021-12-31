from unittest import mock

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
@mock.patch("app.graphql.reports.mutations.orders.init_export_for_report")
async def test_export_orders_schedules_task(m_task, graphql):
    # given
    variables = {"input": {"columns": {"fields": ["ID", "NUMBER"]}}}
    # when
    result = await graphql.execute(MUTATION_EXPORT_ORDERS, variables)
    # then
    assert result["data"]["exportOrders"]["type"] == ExportObjectTypesEnum.ORDERS.name
    assert m_task.call_count == 1
