import json
from unittest import mock

import pytest

from app.core.export.fetch import fetch_report_by_id

MUTATION_UPDATE_PRODUCTS_REPORT = """
mutation ProductsExport($input: ExportProductsInput!, $reportId: Int!) {
    updateProductsReport (input: $input, reportId: $reportId) {
        report {
            id
            type
            filter
            columns {
                ... on ProductSelectedColumnsInfo {
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
@mock.patch("app.graphql.reports.mutations.products.fetch_products_response")
async def test_update_products_report(m_fetch, graphql, products_report, db_session):
    # given
    fields = ["VARIANT_SKU"]
    filter = {"ids": "1234"}
    filter_str = json.dumps(filter)
    print(filter_str)

    variables = {
        "reportId": products_report.id,
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
    result = await graphql.execute(MUTATION_UPDATE_PRODUCTS_REPORT, variables)

    # then
    assert (
        result["data"]["updateProductsReport"]["report"]["columns"]["fields"] == fields
    )
    assert result["data"]["updateProductsReport"]["report"]["filter"] == filter_str
    refreshed_report = await fetch_report_by_id(db_session, products_report.id)
    assert refreshed_report.filter_input == filter
    assert refreshed_report.columns["fields"] == fields


@pytest.mark.asyncio
async def test_update_products_report_invalid_type(graphql, orders_report, db_session):
    # given
    variables = {
        "reportId": orders_report.id,
        "input": {
            "columns": {
                "fields": ["ID"],
            }
        },
    }

    # when
    result = await graphql.execute(MUTATION_UPDATE_PRODUCTS_REPORT, variables)

    # then
    error = result["data"]["updateProductsReport"]["errors"][0]
    assert error["code"] == "INVALID_TYPE"
