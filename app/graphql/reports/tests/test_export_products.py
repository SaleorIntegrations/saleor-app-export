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
async def test_export_products_schedules_task(graphql):
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
    assert (
        result["data"]["exportProducts"]["type"] == ExportObjectTypesEnum.PRODUCTS.name
    )
