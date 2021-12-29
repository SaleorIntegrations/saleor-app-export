from gql import Client, gql

from app.core.common.utils.sdk.saleor import get_saleor_transport


async def execute_query(query: str) -> dict:
    """Execute query on the current saleor instance"""
    transport = await get_saleor_transport()
    client = Client(transport=transport, fetch_schema_from_transport=True)
    query = gql(query)
    response = await client.execute_async(query)
    return response
