import functools
import os
from urllib.parse import urlparse

import structlog
from asgiref.sync import async_to_sync
from celery import Celery
from celery.signals import task_prerun
from fastapi import Depends
from saleor_app_base.core import context
from saleor_app_base.core.tenant_settings import environment_tenant_context
from saleor_app_base.models.settings.queries import get_tenant_by_tenant_id

from db import async_session, get_db


AWS_SQS_ENDPOINT_URL = os.getenv("AWS_SQS_ENDPOINT_URL")
endpoint_parsed = urlparse(AWS_SQS_ENDPOINT_URL)


celery = Celery("app")
if AWS_SQS_ENDPOINT_URL:
    celery.conf.broker_url = "sqs://" + (
        ""
        if AWS_SQS_ENDPOINT_URL is None
        else f"{endpoint_parsed.hostname}:{endpoint_parsed.port}"
    )
    celery.conf.broker_transport_options = {
        "region": os.environ["AWS_DEFAULT_REGION"],
        "is_secure": AWS_SQS_ENDPOINT_URL is None or endpoint_parsed.scheme == "https",
        "predefined_queues": {
            "celery": {
                "url": os.environ["CELERY_BROKER_QUEUE"],
            }
        },
    }
else:
    celery.conf.broker_url = "redis://localhost:6379/0"
    celery.conf.result_backend = "redis://localhost:6379/0"


class ContextTask(celery.Task):
    def __call__(self, *args, db=Depends(get_db), **kwargs):
        result = async_to_sync(self.run)(*args, **kwargs)
        return result


celery.Task = ContextTask


def database_task(task_fun):
    @celery.task()
    @functools.wraps(task_fun)
    async def task(*args, **kwargs):
        async with async_session() as db:
            # Activate context based on env variables
            await context.init(environment_tenant_context())
            # Activate context based on the tenant
            tenant_id = kwargs.pop("tenant_id")
            tenant_context = await get_tenant_by_tenant_id(db, tenant_id)
            await context.init(tenant_context, db)
            # Execute the task with injected db connection
            res = await task_fun(db, *args, **kwargs)
        return res

    task.inner = task_fun
    return task


# Clears thread-local context just before every task runs and adds
# celery task-specific context.
@task_prerun.connect
def configure_structlog(sender, task_id=None, task=None, **kwargs):
    logger = structlog.get_logger()
    logger.new(task_id=task_id, task_name=task.name)


celery.autodiscover_tasks(packages=["app.core.export"])
