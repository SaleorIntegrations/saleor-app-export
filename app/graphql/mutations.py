import strawberry

from .reports.mutations.base import mutate_delete_report
from .reports.mutations.job import mutate_run_report
from .reports.mutations.orders import (
    mutate_create_orders_report,
    mutate_update_orders_report,
)
from .reports.mutations.products import (
    mutate_create_products_report,
    mutate_update_products_report,
)
from .reports.responses import DeleteReportResponse, ReportResponse, RunReportResponse


@strawberry.type
class Mutation:
    create_orders_report: ReportResponse = strawberry.mutation(
        mutate_create_orders_report
    )
    update_orders_report: ReportResponse = strawberry.mutation(
        mutate_update_orders_report
    )
    create_products_report: ReportResponse = strawberry.mutation(
        mutate_create_products_report
    )
    update_products_report: ReportResponse = strawberry.mutation(
        mutate_update_products_report
    )
    run_report: RunReportResponse = strawberry.mutation(mutate_run_report)
    delete_report: DeleteReportResponse = strawberry.mutation(mutate_delete_report)
