from app.core.export.builder import build_recipients_query
from app.core.export.fields import RecipientInfo


def test_build_recipients_query_with_no_users():
    # given
    info = RecipientInfo(users=[], permission_groups=["Group:1"])

    # when
    pq = build_recipients_query(info)

    # then
    assert "staffUsers" not in pq.query_str
    assert "permissionGroups" in pq.query_str
    assert pq.variable_values == {}


def test_build_recipients_query_with_no_groups():
    # given
    info = RecipientInfo(users=["User:1"], permission_groups=[])

    # when
    pq = build_recipients_query(info)

    # then
    assert "staffUsers" in pq.query_str
    assert "permissionGroups" not in pq.query_str
    assert pq.variable_values == {}
