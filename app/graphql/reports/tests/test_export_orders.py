from unittest import mock

import pytest
from gql.transport.exceptions import TransportQueryError

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
@mock.patch("app.graphql.reports.mutations.base.start_job_for_report")
async def test_export_orders_schedules_task(m_task, graphql):
    # given
    variables = {"input": {"columns": {"fields": ["ID", "NUMBER"]}}}
    # when
    result = await graphql.execute(MUTATION_EXPORT_ORDERS, variables)
    # then
    assert result["data"]["exportOrders"]["type"] == ExportObjectTypesEnum.ORDERS.name
    assert m_task.delay.call_count == 1


@pytest.mark.asyncio
@mock.patch("app.graphql.reports.mutations.base.start_job_for_report")
async def test_export_orders_invalid_filter_json(m_task, graphql):
    # given
    variables = {
        "input": {
            "columns": {"fields": ["ID", "NUMBER"]},
            "filter": {"filterStr": "{not a real json}"},
        },
    }
    # when
    result = await graphql.execute(MUTATION_EXPORT_ORDERS, variables)
    # then
    assert result["data"]["exportOrders"]["code"] == "INVALID_FILTER"
    assert m_task.delay.call_count == 0


@pytest.mark.asyncio
@mock.patch("app.graphql.reports.mutations.orders.fetch_orders_response")
@mock.patch("app.graphql.reports.mutations.base.start_job_for_report")
async def test_export_orders_remote_graphql_error(m_task, m_fetch, graphql):
    # given
    msg = "remote error"
    m_fetch.side_effect = TransportQueryError(msg)
    variables = {
        "input": {
            "columns": {"fields": ["ID", "NUMBER"]},
            "filter": {"filterStr": '{"notReal": "but json"}'},
        },
    }
    # when
    result = await graphql.execute(MUTATION_EXPORT_ORDERS, variables)
    # then
    assert result["data"]["exportOrders"]["code"] == "INVALID_FILTER"
    assert result["data"]["exportOrders"]["message"] == msg
    assert m_task.delay.call_count == 0
