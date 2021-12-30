from unittest import mock

import pytest

from app.core.export.products.fields import ProductFieldEnum
from app.core.export.products.headers import (
    FIELD_ENUM_TO_HEADER_MAP,
    get_attribute_headers,
    get_channel_headers,
    get_headers,
    get_static_headers,
    get_warehouse_headers,
)


@pytest.mark.asyncio
async def test_get_static_headers():
    # given
    reversed_fields = list(reversed(ProductFieldEnum))
    # when
    headers = get_static_headers(reversed_fields)
    # then
    assert len(headers) == len(ProductFieldEnum)
    for i, field in enumerate(ProductFieldEnum):
        assert headers[i] == FIELD_ENUM_TO_HEADER_MAP[field]


@pytest.mark.asyncio
async def test_get_attribute_headers():
    # given
    attribute_id = "Attribute:1"
    # when
    headers = get_attribute_headers(attribute_id)
    # then
    assert len(headers) == 1
    assert headers[0] == attribute_id


@pytest.mark.asyncio
async def test_get_channel_headers():
    # given
    channel_id = "Channel:1"
    # when
    headers = get_channel_headers(channel_id)
    # then
    assert len(headers) == 2
    assert headers[0] == f"Price ({channel_id})"
    assert headers[1] == f"Currency ({channel_id})"


@pytest.mark.asyncio
async def test_get_warehouse_headers():
    # given
    warehouse_id = "Warehouse:1"
    # when
    headers = get_warehouse_headers(warehouse_id)
    # then
    assert len(headers) == 1
    assert headers[0] == f"Stock quantity ({warehouse_id})"


@pytest.mark.asyncio
@mock.patch("app.core.export.products.fetch.execute_query")
@mock.patch("app.core.export.products.headers.get_warehouse_headers")
@mock.patch("app.core.export.products.headers.get_channel_headers")
@mock.patch("app.core.export.products.headers.get_attribute_headers")
@mock.patch("app.core.export.products.headers.get_static_headers")
async def test_get_headers(
    m_static, m_attribute, m_channel, m_warehouse, m_execute, product_column_info
):
    # given
    m_execute.return_value = {
        "attributes": {"edges": []},
        "channels": [],
        "warehouses": {"edges": []},
    }
    product_column_info.warehouses = ["1", "2"]
    product_column_info.channels = ["3", "4"]
    product_column_info.attributes = ["5", "6"]
    a = ["a"]
    m_static.return_value = a
    b = ["b"]
    c = ["c"]
    m_attribute.side_effect = [b, c]
    d = ["d"]
    e = ["e"]
    m_channel.side_effect = [d, e]
    f = ["f"]
    g = ["g"]
    m_warehouse.side_effect = [f, g]
    # when
    headers = await get_headers(product_column_info)
    # then
    assert len(headers) == 7
    assert headers == ["a", "b", "c", "d", "e", "f", "g"]
