from sqlalchemy.exc import NoResultFound

from app.core.export.fetch import fetch_report_by_id
from app.core.export.persist import create_job
from app.core.export.tasks import start_job_for_report
from app.graphql.reports.responses import RunReportResponse


async def mutate_run_report(root, info, report_id: int) -> RunReportResponse:
    """Mutation for triggering the export process."""
    db = info.context["db"]
    domain = info.context["domain"]
    try:
        report = await fetch_report_by_id(db, report_id, domain)
    except NoResultFound:
        return RunReportResponse(job=None)
    job = await create_job(db, report.id)
    start_job_for_report.delay(job.id)
    return RunReportResponse(job=job)
