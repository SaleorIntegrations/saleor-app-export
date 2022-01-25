from typing import List

from app.core.export.email.client import send_email, Attachment
from app.core.reports.models import Report, ExportObjectTypesEnum, Job

EMAIL_TEMPLATE = """
Hi!

Your file with products data is ready and attached to this email.

This is an automatically generated e-mail, please do not reply.

Sincerely,
Saleor Commerce
"""


def get_report_subject(report: Report):
    if report.name:
        return report.name
    elif report.type == ExportObjectTypesEnum.PRODUCTS:
        return "Saleor export: Products"
    elif report.type == ExportObjectTypesEnum.ORDERS:
        return "Saleor export: Orders"
    return "Saleor data export"


def send_report_email(
    report: Report,
    job: Job,
    recipients: List[str],
    attachments: List[Attachment] = None,
):
    if attachments is None:
        attachments = []

    subject = get_report_subject(report)
    content = EMAIL_TEMPLATE

    send_email(
        subject=subject, content=content, recipients=recipients, attachments=attachments
    )
