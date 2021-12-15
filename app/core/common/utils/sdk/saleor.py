import structlog
from gql import Client
from gql.dsl import DSLSchema
from gql.transport.aiohttp import AIOHTTPTransport
from graphql import DocumentNode
from saleor_app_base.core.context import tenant_context
from saleor_app_base.sdk.saleor import SALEOR_PROTOCOL

logger = structlog.get_logger()

# TODO remove this
class SaleorDSLClient:
    """
    Graphql client that executes DSL queries, making calls to the SALEOR core project.

    DSL stands for Domain Specific Language.
    """

    def __init__(self):
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
        self.transport = AIOHTTPTransport(
            url=f"{SALEOR_PROTOCOL}://{domain}/graphql/",
            headers=headers,
        )
        # self.client = Client(transport=transport, fetch_schema_from_transport=True)

    async def get_ds(self):
        """Return DSL schema that is required to build a query."""
        client = Client(transport=self.transport, fetch_schema_from_transport=True)
        # async with client as session:
        #     self.session = session
        ds = DSLSchema(client.schema)

        return ds

    async def execute(self, query: DocumentNode):
        # async with self.client as session:
        # self.client
        response = await self.client.execute(query)
        return response


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
