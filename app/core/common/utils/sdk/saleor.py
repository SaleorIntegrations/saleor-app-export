import structlog
from gql.transport.aiohttp import AIOHTTPTransport
from saleor_app_base.core.context import tenant_context
from saleor_app_base.sdk.saleor import SALEOR_PROTOCOL

logger = structlog.get_logger()


async def get_saleor_transport():
    tc = tenant_context()
    domain = tc.tenant.domain
    token = tc.tenant.saleor_token
    headers = {
        "Authorization": f"Bearer {token}",
    }
    transport = AIOHTTPTransport(
        url=f"{SALEOR_PROTOCOL}://{domain}/graphql/",
        headers=headers,
    )
    return transport
