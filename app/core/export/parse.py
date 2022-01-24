def parse_recipients_response(
    response: dict,
) -> tuple[dict[str, list[str]], dict[str, list[str]]]:
    """Returns mapping from object ids to emails."""

    users_map = {}
    if "staffUsers" in response:
        for edge in response["staffUsers"]["edges"]:
            user = edge["node"]
            users_map[user["id"]] = [user["email"]]

    groups_map = {}
    if "permissionGroups" in response:
        for edge in response["permissionGroups"]["edges"]:
            group = edge["node"]
            group_id = group["id"]
            groups_map[group_id] = []
            for user in group["users"]:
                groups_map[group_id].append(user["email"])

    return users_map, groups_map
