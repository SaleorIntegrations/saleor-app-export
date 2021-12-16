from typing import Any, Dict, List, Union

import structlog
from gql import Client
from gql.dsl import DSLQuery, DSLSchema, dsl_gql

from app.core.common.utils.sdk.saleor import get_saleor_transport

logger = structlog.get_logger()


BATCH_SIZE = 100


async def get_product_queryset(
    scope: Dict[str, Union[str, dict]],
    cursor: str = None,
) -> List[Dict[str, Any]]:
    transport = await get_saleor_transport()
    client = Client(transport=transport, fetch_schema_from_transport=True)

    async with client as session:
        ds = DSLSchema(client.schema)
        params = {"first": BATCH_SIZE}
        if cursor:
            params["after"] = cursor
        query = ds.Query.orders(**params)

        dsl_query = dsl_gql(
            DSLQuery(
                query.select(
                    ds.OrderCountableConnection.edges.select(
                        ds.OrderCountableEdge.node.select(
                            ds.Order.id,
                        )
                    )
                )
            )
        )
        response = await session.execute(dsl_query)

    return response
