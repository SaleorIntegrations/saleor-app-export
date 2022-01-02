import strawberry

from .reports.mutations.job import mutate_run_report
from .reports.mutations.orders import mutate_export_orders
from .reports.mutations.products import mutate_export_products
from .reports.responses import ExportResponse, RunReportResponse


@strawberry.type
class Mutation:
    export_orders: ExportResponse = strawberry.mutation(mutate_export_orders)
    export_products: ExportResponse = strawberry.mutation(mutate_export_products)
    run_report: RunReportResponse = strawberry.mutation(mutate_run_report)
