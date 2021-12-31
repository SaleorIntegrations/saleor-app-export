import json

import pytest


@pytest.fixture
def dummy_orders_response_has_next():
    with open("app/core/export/orders/tests/data/response-first-page.json") as f:
        return json.loads(f.read())["data"]


@pytest.fixture
def dummy_orders_response_has_no_next():
    with open("app/core/export/orders/tests/data/response-last-page.json") as f:
        return json.loads(f.read())["data"]
