from typing import List
import enum

import strawberry
from pydantic import BaseModel, validator

from app.core.reports.models import ExportObjectTypesEnum, Report
from app.core.export.products.tasks import export_products_task


@strawberry.input
class ExportInfoInput:
    fields: List[str]
    attributes: List[str]
    warehouses: List[str]
    channels: List[str]


class ExportProductsModel(BaseModel):
    """
    A Pydantic model for the export info.

    Is used for validation of the ExportProductsInput.
    """

    scope: str
    filter: str
    ids: List[str]
    export_info: ExportInfoInput
    fileType: str

    @validator("ids")
    def ids_provided(cls, v, values, **kwargs):
        if values["scope"].lower() == ExportScope.IDS.value and not v:
            raise ValueError("You must provide at least one product id.")
        return v

    @validator("filter")
    def filter_provided(cls, v, values, **kwargs):
        if values["scope"].lower() == ExportScope.FILTER.value and not v:
            raise ValueError("You must provide filter input.")
        return v


@strawberry.experimental.pydantic.input(model=ExportProductsModel)
class ExportProductsInput:
    """
    Fields in this inpute are automatically fetched from the ExportProductsModel.
    """

    scope: strawberry.auto
    filter: strawberry.auto
    ids: strawberry.auto
    export_info: strawberry.auto
    fileType: strawberry.auto


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


def get_scope(input):
    scope = input.scope.lower()
    if scope == ExportScope.IDS.value:  # type: ignore
        return {"ids": input.ids}
    elif scope == ExportScope.FILTER.value:  # type: ignore
        return {"filter": filter}
    return {"all": ""}


async def mutate_export_products(root, input: ExportProductsInput, info):
    """
    Mutation for triggering the export process.
    """

    # This method triggers the validation of the input
    # in the ExportProductsModel.
    input.to_pydantic()

    scope = get_scope(input)
    db = info.context["db"]

    report = Report(
        type=ExportObjectTypesEnum.PRODUCTS,
        scope=input.scope,
        filter_input=input.filter,
        ids=input.ids,
    )
    db.add(report)
    await db.commit()

    await export_products_task(
        report.id,
        scope,
        input.export_info,
        input.fileType,
    )
    return report
