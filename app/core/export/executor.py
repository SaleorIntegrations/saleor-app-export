from typing import Optional

from gql import Client, gql

from app.core.common.utils.sdk.saleor import get_saleor_transport


async def execute_query(query: str, variable_values: Optional[dict] = None) -> dict:
    """Execute query on the current saleor instance"""
    transport = await get_saleor_transport()
    client = Client(transport=transport)
    query = gql(query)
    execute_kwargs = {}
    if variable_values:
        execute_kwargs = {"variable_values": variable_values}
    response = await client.execute_async(query, **execute_kwargs)
    return response
