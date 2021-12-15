import strawberry
from strawberry.types import Info

from .reports.types import ReportConnection


class empty:
    pass


@strawberry.type
class Query:
    @strawberry.field
    async def reports(self, info: Info) -> ReportConnection:
        return empty
