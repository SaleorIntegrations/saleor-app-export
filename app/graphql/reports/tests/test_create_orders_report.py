from unittest import mock

import pytest
from gql.transport.exceptions import TransportQueryError

from app.core.reports.models import ExportObjectTypesEnum

MUTATION_EXPORT_ORDERS = """
mutation OrdersExport($input: ExportOrdersInput!) {
    createOrdersReport (input: $input) {
        report {
            id
            type
        }
        errors {
            code
            message
            field
        }
    }
}
"""


@pytest.mark.asyncio
async def test_crete_orders_report(graphql):
    # given
    variables = {"input": {"columns": {"fields": ["ID", "NUMBER"]}}}
    # when
    result = await graphql.execute(MUTATION_EXPORT_ORDERS, variables)
    # then
    report = result["data"]["createOrdersReport"]["report"]
    assert report["type"] == ExportObjectTypesEnum.ORDERS.name


@pytest.mark.asyncio
async def test_export_orders_invalid_filter_json(graphql):
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
    error = result["data"]["createOrdersReport"]["errors"][0]
    assert error["code"] == "INVALID_FILTER"


@pytest.mark.asyncio
@mock.patch("app.graphql.reports.mutations.orders.fetch_orders_response")
async def test_export_orders_remote_graphql_error(m_fetch, graphql):
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
    error = result["data"]["createOrdersReport"]["errors"][0]
    assert error["code"] == "INVALID_FILTER"
    assert error["message"] == msg
