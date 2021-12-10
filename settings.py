import uuid
from typing import Dict, List

from saleor_app_base.data.saleor.installation import Permission, WebhookEvent
from pydantic import BaseSettings
from pydantic.main import BaseModel

################################
# Commented lines are optional #
################################


def tenant_id_getter() -> str:
    return uuid.uuid4().hex


TENANT_ID_GETTER = tenant_id_getter

EXTERNAL_APP_NAME = "Export"


# ALLOWED_ORIGINS: List[str]


class MutableSettings(BaseSettings):
    # Saleor settings
    saleor_default_warehouse: str = ""

    # shipstation settings
    shipstation_api_key: str = ""
    shipstation_api_secret: str = ""
    shipstation_warehouse_mapping: Dict[str, str] = {}


def get_test_mutable_settings() -> MutableSettings:
    return MutableSettings(
        saleor_default_warehouse="warehouse",
        shipstation_api_key="api_key",
        shipstation_api_secret="api_secret",
        shipstation_warehouse_mappint={},
    )


MUTABLE_SETTINGS = MutableSettings

GET_TEST_MUTABLE_SETTINGS = get_test_mutable_settings


# STRUCTLOG_CONTEXTVARS: Callable[['TenantSettings'], Dict[str, Any]]


UI_HTML_PATH = "ui/build/index.html"


permissions: List[Permission] = [Permission.MANAGE_PRODUCTS]

# TODO fill with the webhooks
webhook_events: List[WebhookEvent] = []

PERMISSIONS = permissions

WEBHOOK_EVENTS = webhook_events

# TODO add webhooks
class DummyDataType(BaseModel):
    pass


WEBHOOK_DATA_TYPE = DummyDataType

# WEBHOOK_SEND_DATA = NotImplemented


# signals


# REGISTER_PRE_SIGNALS: List[Signal]
# REGISTER_POST_SIGNALS: List[Signal]

# CONFIG_GET_PRE_SIGNALS: List[Signal]
# CONFIG_GET_POST_SIGNALS: List[Signal]

# CONFIG_PUT_PRE_SIGNALS: List[Signal]
# CONFIG_PUT_POST_SIGNALS: List[Signal]

# CONFIG_PATCH_PRE_SIGNALS: List[Signal]
# CONFIG_PATCH_POST_SIGNALS: List[Signal]

# LOGS_PRE_SIGNALS: List[Signal]
# LOGS_POST_SIGNALS: List[Signal]

# STARTUP_SIGNALS: List[Signal]
# SHUTDOWN_SIGNALS: List[Signal]

# WEBHOOK_PRE_SIGNALS: List[Signal]
# WEBHOOK_POST_SIGNALS: List[Signal]
