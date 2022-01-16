from app.core.export.parse import parse_recipients_response


def test_parse_recipients_response_with_empty_response():
    # given
    response = {}

    # when
    user_map, group_map = parse_recipients_response(response)

    # then
    assert user_map == {}
    assert group_map == {}


def test_parse_recipients_response():
    # given
    mail_1 = "user1@example.com"
    mail_2 = "group1@example.com"
    response = {
        "staffUsers": {
            "edges": [
                {
                    "node": {
                        "id": "User:1",
                        "email": mail_1,
                    }
                }
            ]
        },
        "permissionGroups": {
            "edges": [
                {
                    "node": {
                        "id": "Group:1",
                        "users": [
                            {
                                "email": mail_2,
                            }
                        ],
                    }
                }
            ]
        },
    }

    # when
    user_map, group_map = parse_recipients_response(response)

    # then
    assert user_map == {"User:1": [mail_1]}
    assert group_map == {"Group:1": [mail_2]}
