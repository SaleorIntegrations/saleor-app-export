import strawberry

from .reports.mutations.job import mutate_run_report
from .reports.mutations.orders import mutate_create_orders_report
from .reports.mutations.products import mutate_create_products_report
from .reports.responses import CreateReportResponse, RunReportResponse


@strawberry.type
class Mutation:
    create_orders_report: CreateReportResponse = strawberry.mutation(
        mutate_create_orders_report
    )
    create_products_report: CreateReportResponse = strawberry.mutation(
        mutate_create_products_report
    )
    run_report: RunReportResponse = strawberry.mutation(mutate_run_report)
