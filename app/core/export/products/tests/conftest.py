import json

import pytest


@pytest.fixture
def dummy_variants_response_has_next():
    with open("app/core/export/products/tests/data/response-first-page.json") as f:
        return json.loads(f.read())


@pytest.fixture
def dummy_variants_response_has_no_next():
    with open("app/core/export/products/tests/data/response-last-page.json") as f:
        return json.loads(f.read())
