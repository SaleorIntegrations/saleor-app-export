import dataclasses

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
