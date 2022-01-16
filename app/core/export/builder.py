import dataclasses

from app.core.export.fields import RecipientInfo

MAX_PAGE_SIZE = 100


@dataclasses.dataclass
class PreparedQuery:
    query_str: str
    variable_values: dict


def build_query_base(
    fragments: str,
    name: str,
    filter_type: str,
    fields: str,
    cursor: str,
    filter: dict,
) -> PreparedQuery:
    """Build the query and its variables"""
    params_list = [
        f"first: {MAX_PAGE_SIZE}",
        "filter: $filter",
    ]
    if cursor:
        params_list.append(f'after: "{cursor}"')
    if filter:
        variable_values = {"filter": filter}
    else:
        variable_values = {"filter": None}
    params = ", ".join(params_list)

    return PreparedQuery(
        query_str=f"""
            {fragments}
            query PerformExport ($filter: {filter_type}) {{
                {name} ({params}) {{
                    pageInfo {{
                        endCursor
                        hasNextPage
                    }}
                    edges {{
                        node {{
                            {fields}
                        }}
                    }}
                }}
            }}
        """,
        variable_values=variable_values,
    )


def build_recipients_query(recipient_info: RecipientInfo) -> PreparedQuery:
    variable_values = {}
    users_segment = ""
    if recipient_info.users:
        user_ids = str(recipient_info.users).replace("'", '"')
        users_segment = f"""
            staffUsers (
                first: 100,
                filter: {{ids: {user_ids}}}
            ) {{
                edges {{
                    node {{
                        id
                        email
                    }}
                }}
            }}
        """
    groups_segment = ""
    if recipient_info.permission_groups:
        group_ids = str(recipient_info.permission_groups).replace("'", '"')
        groups_segment = f"""
            permissionGroups (
                first: 100,
                filter: {{ids: {group_ids}}}
            ) {{
                edges {{
                    node {{
                        id
                        users {{
                            email
                        }}
                    }}
                }}
            }}
        """
    query_str = f"""
        query {{
            {users_segment}
            {groups_segment}
        }}
    """
    return PreparedQuery(query_str=query_str, variable_values=variable_values)
