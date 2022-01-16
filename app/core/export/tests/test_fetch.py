from unittest import mock

import pytest

from app.core.export.fetch import fetch_recipients
from app.core.export.fields import RecipientInfo


@pytest.mark.asyncio
@mock.patch("app.core.export.fetch.parse_recipients_response")
@mock.patch("app.core.export.fetch.execute_query")
async def test_fetch_recipients_returns_list(
    m_execute,
    m_parse,
):
    # given
    mail_1 = "user1@example.com"
    mail_2 = "group2@example.com"
    m_parse.return_value = (
        {"User:1": [mail_1]},
        {"Group:2": [mail_2]},
    )
    recipient_info = RecipientInfo(
        users=["User:1", "User:2"],
        permission_groups=["Group:1", "Group:2"],
    )

    # when
    emails = await fetch_recipients(recipient_info)

    # then
    assert m_execute.call_count == 1
    assert m_parse.call_count == 1
    assert emails == [mail_1, mail_2]


@pytest.mark.asyncio
@mock.patch("app.core.export.fetch.parse_recipients_response")
@mock.patch("app.core.export.fetch.execute_query")
async def test_fetch_recipients_raises_exception_for_invalid_user(
    m_execute,
    m_parse,
):
    # given
    m_parse.return_value = {"User:1": ["test@example.com"]}, {}
    recipient_info = RecipientInfo(users=["User:1", "User:2"])

    # when
    with pytest.raises(ValueError) as e:
        await fetch_recipients(recipient_info, raise_exception=True)

    # then
    assert m_execute.call_count == 1
    assert m_parse.call_count == 1
    assert "User:2" in str(e)


@pytest.mark.asyncio
@mock.patch("app.core.export.fetch.parse_recipients_response")
@mock.patch("app.core.export.fetch.execute_query")
async def test_fetch_recipients_raises_exception_for_invalid_group(
    m_execute,
    m_parse,
):
    # given
    m_parse.return_value = {}, {"Group:1": ["test@example.com"]}
    recipient_info = RecipientInfo(permission_groups=["Group:1", "Group:2"])

    # when
    with pytest.raises(ValueError) as e:
        await fetch_recipients(recipient_info, raise_exception=True)

    # then
    assert m_execute.call_count == 1
    assert m_parse.call_count == 1
    assert "Group:2" in str(e)
