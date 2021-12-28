import enum
from typing import List

import strawberry

from app.core.export.products.tasks import export_products_task
from app.core.reports.models import ExportObjectTypesEnum, Report


@strawberry.input
class ExportProductsInfo:
    fields: List[str]
    fileType: str
    scope: str
    filter: str
    ids: List[str]


@strawberry.input
class ExportProductsInput:
    export_info: ExportProductsInfo


@strawberry.enum
class ExportScope(enum.Enum):
    ALL = "all"
    IDS = "ids"
    FILTER = "filter"

    @property
    def description(self):
        # pylint: disable=no-member
        description_mapping = {
            ExportScope.ALL.name: "Export all products.",
            ExportScope.IDS.name: "Export products with given ids.",
            ExportScope.FILTER.name: "Export the filtered products.",
        }
        if self.name in description_mapping:
            return description_mapping[self.name]
        raise ValueError("Unsupported enum value: %s" % self.value)


async def mutate_export_products(root, input: ExportProductsInput, info):
    """
    Mutation for triggering the export process.
    """
    db = info.context["db"]

    report = Report(
        type=ExportObjectTypesEnum.PRODUCTS,
        scope=input.export_info.scope,
        filter_input=input.export_info.filter,
        ids=input.export_info.ids,
    )
    db.add(report)
    await db.commit()

    await export_products_task(report.id)
    return report
