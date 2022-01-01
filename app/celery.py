import functools

import structlog
from asgiref.sync import async_to_sync
from celery import Celery
from celery.signals import task_prerun
from fastapi import Depends
from saleor_app_base.core import context
from saleor_app_base.core.tenant_settings import environment_tenant_context

from db import async_session, get_db

celery = Celery("app")
celery.conf.broker_url = "redis://localhost:6379/0"
celery.conf.result_backend = "redis://localhost:6379/0"


class ContextTask(celery.Task):
    def __call__(self, *args, db=Depends(get_db), **kwargs):
        context.init(environment_tenant_context())
        result = async_to_sync(self.run)(*args, **kwargs)
        return result


celery.Task = ContextTask


def database_task(task_fun):
    @celery.task()
    @functools.wraps(task_fun)
    async def task(*args, **kwargs):
        async with async_session() as db:
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
