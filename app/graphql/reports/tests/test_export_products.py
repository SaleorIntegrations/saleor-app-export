from unittest import mock

import pytest

from app.core.reports.models import ExportObjectTypesEnum

MUTATION_EXPORT_ORDERS = """
mutation ProductsExport($input: ExportProductsInput!) {
    exportProducts (input: $input) {
        id
        type
    }
}
"""


@pytest.mark.asyncio
@mock.patch("app.graphql.reports.mutations.products.init_export_for_report")
async def test_export_products_schedules_task(m_task, graphql):
    # given
    variables = {
        "input": {
            "columns": {
                "fields": ["ID", "VARIANT_ID"],
            },
        }
    }
    # when
    result = await graphql.execute(MUTATION_EXPORT_ORDERS, variables)
    # then
    assert (
        result["data"]["exportProducts"]["type"] == ExportObjectTypesEnum.PRODUCTS.name
    )
    assert m_task.call_count == 1
