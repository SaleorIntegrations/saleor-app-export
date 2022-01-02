import json
from unittest import mock

import pytest

from app.core.export.fetch import fetch_report_by_id

MUTATION_UPDATE_ORDERS_REPORT = """
mutation OrdersExport($input: ExportOrdersInput!, $reportId: Int!) {
    updateOrdersReport (input: $input, reportId: $reportId) {
        report {
            id
            type
            filter
            columns {
                ... on OrderSelectedColumnsInfo {
                    fields
                }
            }
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
@mock.patch("app.graphql.reports.mutations.orders.fetch_orders_response")
async def test_update_orders_report(m_fetch, graphql, orders_report, db_session):
    # given
    fields = ["LINES_SKU"]
    filter = {"ids": "1234"}
    filter_str = json.dumps(filter)
    print(filter_str)

    variables = {
        "reportId": orders_report.id,
        "input": {
            "columns": {
                "fields": fields,
            },
            "filter": {
                "filterStr": filter_str,
            },
        },
    }

    # when
    result = await graphql.execute(MUTATION_UPDATE_ORDERS_REPORT, variables)

    # then
    assert result["data"]["updateOrdersReport"]["report"]["columns"]["fields"] == fields
    assert result["data"]["updateOrdersReport"]["report"]["filter"] == filter_str
    refreshed_report = await fetch_report_by_id(db_session, orders_report.id)
    assert refreshed_report.filter_input == filter
    assert refreshed_report.columns["fields"] == fields


@pytest.mark.asyncio
async def test_update_orders_report_invalid_type(graphql, products_report, db_session):
    # given
    variables = {
        "reportId": products_report.id,
        "input": {
            "columns": {
                "fields": ["ID"],
            }
        },
    }

    # when
    result = await graphql.execute(MUTATION_UPDATE_ORDERS_REPORT, variables)

    # then
    error = result["data"]["updateOrdersReport"]["errors"][0]
    assert error["code"] == "INVALID_TYPE"
