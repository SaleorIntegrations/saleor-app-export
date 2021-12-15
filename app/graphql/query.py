from typing import List

import strawberry
from strawberry.types import Info

from .reports.resolvers import resolve_reports
from .reports.types import Report


@strawberry.type
class Query:
    @strawberry.field
    async def reports(self, info: Info) -> List[Report]:
        return await resolve_reports(info.context["db"])
