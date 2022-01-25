from typing import List

from app.core.export.email.client import send_email
from app.core.reports.models import Report, ExportObjectTypesEnum

EMAIL_TEMPLATE = """
Hi!

Your file with products data is ready to download: __DOWNLOAD_URL__

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
    recipients: List[str],
    url="https://example.com/report.csv",
):
    subject = get_report_subject(report)
    content = EMAIL_TEMPLATE.replace("__DOWNLOAD_URL__", url)
    send_email(
        subject=subject,
        content=content,
        recipients=recipients,
    )
