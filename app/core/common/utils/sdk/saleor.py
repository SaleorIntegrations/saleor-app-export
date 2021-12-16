import structlog
from gql.transport.aiohttp import AIOHTTPTransport
from saleor_app_base.core.context import tenant_context
from saleor_app_base.sdk.saleor import SALEOR_PROTOCOL

logger = structlog.get_logger()


async def get_saleor_transport():
    tc = tenant_context()
    domain = tc.immutable.saleor_domain
    token = tc.immutable.saleor_api_token
    headers = None

    if token:
        headers = {
            "Authorization": f"Bearer {token}",
        }

    # TODO pass the domain somewhere as an env var
    domain = "devkawapl.eu.saleor.cloud"
    transport = AIOHTTPTransport(
        url=f"{SALEOR_PROTOCOL}://{domain}/graphql/",
        headers=headers,
    )

    return transport
