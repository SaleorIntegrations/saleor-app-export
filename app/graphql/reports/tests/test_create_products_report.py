from unittest import mock

import pytest
from gql.transport.exceptions import TransportQueryError

from app.core.export.fetch import fetch_report_by_id
from app.core.reports.models import ExportObjectTypesEnum

MUTATION_EXPORT_PRODUCTS = """
mutation ProductsExport($input: ExportProductsInput!) {
    createProductsReport (input: $input) {
        report {
            id
            name
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
async def test_create_products_report(graphql):
    # given
    name = "My report 12"
    variables = {
        "input": {
            "columns": {
                "fields": ["ID", "VARIANT_ID"],
            },
            "name": name,
            "recipients": {
                "users": [],
                "permissionGroups": [],
            },
        }
    }

    # when
    result = await graphql.execute(MUTATION_EXPORT_PRODUCTS, variables)

    # then
    report = result["data"]["createProductsReport"]["report"]
    assert report["type"] == ExportObjectTypesEnum.PRODUCTS.name
    assert report["name"] == name


@pytest.mark.asyncio
async def test_export_products_without_optional_columns(db_session, graphql):
    # given
    variables = {
        "input": {
            "columns": {
                "fields": ["ID", "VARIANT_ID"],
            },
            "recipients": {
                "users": [],
                "permissionGroups": [],
            },
        }
    }

    # when
    result = await graphql.execute(MUTATION_EXPORT_PRODUCTS, variables)

    # then
    report_id = result["data"]["createProductsReport"]["report"]["id"]
    report = await fetch_report_by_id(db_session, report_id)
    assert len(report.columns["fields"]) == 2
    assert len(report.columns["attributes"]) == 0
    assert len(report.columns["warehouses"]) == 0
    assert len(report.columns["channels"]) == 0


@pytest.mark.asyncio
async def test_export_products_wit_related_columns(db_session, graphql):
    # given
    fields = ["ID", "VARIANT_ID"]
    channel_ids = ["1", "2", "3"]
    warehouse_ids = ["4", "5", "6"]
    attribute_ids = ["7", "8", "9"]
    variables = {
        "input": {
            "columns": {
                "fields": fields,
                "channels": channel_ids,
                "warehouses": warehouse_ids,
                "attributes": attribute_ids,
            },
            "recipients": {
                "users": [],
                "permissionGroups": [],
            },
        }
    }

    # when
    result = await graphql.execute(MUTATION_EXPORT_PRODUCTS, variables)

    # then
    report_id = result["data"]["createProductsReport"]["report"]["id"]
    report = await fetch_report_by_id(db_session, report_id)
    assert report.columns["fields"] == fields
    assert report.columns["attributes"] == attribute_ids
    assert report.columns["warehouses"] == warehouse_ids
    assert report.columns["channels"] == channel_ids


@pytest.mark.asyncio
@pytest.mark.parametrize("input_field", ["attributes", "warehouses"])
async def test_export_products_exceeds_column_limit(graphql, input_field):
    # given
    variables = {
        "input": {
            "columns": {
                "fields": ["ID", "VARIANT_ID"],
                input_field: [str(i) for i in range(101)],
            },
            "recipients": {
                "users": [],
                "permissionGroups": [],
            },
        }
    }

    # when
    result = await graphql.execute(MUTATION_EXPORT_PRODUCTS, variables)

    # then
    error = result["data"]["createProductsReport"]["errors"][0]
    assert error["field"] == input_field
    assert error["code"] == "LIMIT_EXCEEDED"


@pytest.mark.asyncio
async def test_export_products_invalid_filter_json(graphql):
    # given
    variables = {
        "input": {
            "columns": {"fields": ["ID", "VARIANT_ID"]},
            "filter": {"filterStr": "{not a real json}"},
            "recipients": {
                "users": [],
                "permissionGroups": [],
            },
        },
    }

    # when
    result = await graphql.execute(MUTATION_EXPORT_PRODUCTS, variables)

    # then
    error = result["data"]["createProductsReport"]["errors"][0]
    assert error["code"] == "INVALID_FILTER"


@pytest.mark.asyncio
@mock.patch("app.graphql.reports.mutations.products.fetch_products_response")
async def test_export_products_remote_graphql_error(m_fetch, graphql):
    # given
    msg = "remote error"
    m_fetch.side_effect = TransportQueryError(msg)
    variables = {
        "input": {
            "columns": {"fields": ["ID", "VARIANT_ID"]},
            "filter": {"filterStr": '{"notReal": "but json"}'},
            "recipients": {
                "users": [],
                "permissionGroups": [],
            },
        },
    }

    # when
    result = await graphql.execute(MUTATION_EXPORT_PRODUCTS, variables)

    # then
    error = result["data"]["createProductsReport"]["errors"][0]
    assert error["code"] == "INVALID_FILTER"
    assert error["message"] == msg
