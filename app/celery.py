import structlog
from asgiref.sync import async_to_sync
from celery import Celery
from celery.signals import task_prerun
from fastapi import Depends
from saleor_app_base.core import context
from saleor_app_base.core.tenant_settings import environment_tenant_context
from saleor_app_base.main import configure_application

from db import async_session, get_db

app = configure_application()

celery = Celery("app")
celery.conf.broker_url = "redis://localhost:6379/0"
celery.conf.result_backend = "redis://localhost:6379/0"


async def use_db(fun, *args, **kwargs):
    context.init(environment_tenant_context())
    async with async_session() as session:
        res = await fun(session, *args, **kwargs)
        await session.commit()
        return res


class ContextTask(celery.Task):
    def __call__(self, *args, db=Depends(get_db), **kwargs):
        return async_to_sync(use_db)(self.run, *args, **kwargs)


celery.Task = ContextTask


# Clears thread-local context just before every task runs and adds
# celery task-specific context.
@task_prerun.connect
def configure_structlog(sender, task_id=None, task=None, **kwargs):
    logger = structlog.get_logger()
    logger.new(task_id=task_id, task_name=task.name)


celery.autodiscover_tasks(packages=["app.core.export"])
