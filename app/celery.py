import os

import structlog
from celery import Celery
from celery.signals import task_prerun


app = Celery("export")

app.conf.broker_url = os.getenv("REDIS_URL")
app.conf.result_backend = os.getenv("REDIS_URL")


# Clears thread-local context just before every task runs and adds
# celery task-specific context.
@task_prerun.connect
def configure_structlog(sender, task_id=None, task=None, **kwargs):
    logger = structlog.get_logger()
    logger.new(task_id=task_id, task_name=task.name)


app.autodiscover_tasks()
