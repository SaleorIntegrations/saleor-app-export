import importlib

from sqlmodel import SQLModel

INSTALLED_MODULES = ["app.core.reports.models"]

for module in INSTALLED_MODULES:
    importlib.import_module(module)

ProxySQLModel = SQLModel
