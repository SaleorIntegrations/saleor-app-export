import uuid

from pydantic import BaseSettings
from pydantic.main import BaseModel
from saleor_app_base.data.saleor.installation import Permission

################################
# Commented lines are optional #
################################


def tenant_id_getter() -> str:
    return uuid.uuid4().hex


TENANT_ID_GETTER = tenant_id_getter

EXTERNAL_APP_NAME = "Export"


class MutableSettings(BaseSettings):
    pass


def get_test_mutable_settings() -> MutableSettings:
    return MutableSettings()


MUTABLE_SETTINGS = MutableSettings

GET_TEST_MUTABLE_SETTINGS = get_test_mutable_settings


UI_HTML_PATH = "ui/build/index.html"


PERMISSIONS = [
    Permission.MANAGE_PRODUCTS,
    Permission.MANAGE_ORDERS,
    Permission.MANAGE_STAFF,
]


WEBHOOK_EVENTS = []


class DummyDataType(BaseModel):
    pass


WEBHOOK_DATA_TYPE = DummyDataType
