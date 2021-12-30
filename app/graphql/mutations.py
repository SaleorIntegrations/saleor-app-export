import strawberry

from .reports.mutations.orders import mutate_export_orders
from .reports.mutations.products import mutate_export_products
from .reports.types import ExportResponse


@strawberry.type
class Mutation:
    export_orders: ExportResponse = strawberry.mutation(mutate_export_orders)
    export_products: ExportResponse = strawberry.mutation(mutate_export_products)
