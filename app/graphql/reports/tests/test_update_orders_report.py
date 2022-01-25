import json
from unittest import mock

import pytest

from app.core.export.fetch import fetch_report_by_id

MUTATION_UPDATE_ORDERS_REPORT = """
mutation OrdersExport($input: ExportOrdersInput!, $reportId: Int!) {
    updateOrdersReport (input: $input, reportId: $reportId) {
        report {
            id
            name
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
async def test_update_orders_report(
    m_fetch,
    m_base_fetch_recipients,
    graphql,
    orders_report,
    db_session,
    x_saleor_domain,
):
    # given
    fields = ["LINES_SKU"]
    filter = {"ids": "1234"}
    name = "Copy report 12"
    filter_str = json.dumps(filter)

    variables = {
        "reportId": orders_report.id,
        "input": {
            "columns": {
                "fields": fields,
            },
            "filter": {
                "filterStr": filter_str,
            },
            "name": name,
            "recipients": {
                "users": ["User:1"],
                "permissionGroups": [],
            },
        },
    }

    # when
    result = await graphql.execute(MUTATION_UPDATE_ORDERS_REPORT, variables)

    # then
    report = result["data"]["updateOrdersReport"]["report"]
    assert report["columns"]["fields"] == fields
    assert report["filter"] == filter_str
    assert report["name"] == name
    refreshed_report = await fetch_report_by_id(
        db_session, orders_report.id, x_saleor_domain
    )
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
            },
            "recipients": {
                "users": ["User:1"],
                "permissionGroups": [],
            },
        },
    }

    # when
    result = await graphql.execute(MUTATION_UPDATE_ORDERS_REPORT, variables)

    # then
    error = result["data"]["updateOrdersReport"]["errors"][0]
    assert error["code"] == "INVALID_TYPE"
