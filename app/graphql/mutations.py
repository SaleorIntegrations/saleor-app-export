import strawberry

from .reports.mutations.orders import mutate_export_orders
from .reports.types import Report


@strawberry.type
class Mutation:
    export_orders: Report = strawberry.mutation(mutate_export_orders)
