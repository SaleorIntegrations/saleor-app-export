from unittest import mock

import pytest


@pytest.fixture
def m_base_fetch_recipients():
    with mock.patch("app.graphql.reports.mutations.base.fetch_recipients") as m:
        yield m
