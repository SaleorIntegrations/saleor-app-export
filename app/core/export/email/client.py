import smtplib
from email.message import EmailMessage
from typing import List

from app.core.export.email import email_settings


def send_email(
    subject: str,
    content: str,
    recipients: List[str],
):
    msg = EmailMessage()
    msg['Subject'] = subject
    msg['From'] = email_settings.FROM_ADDRESS
    msg.set_content(content)

    with smtplib.SMTP_SSL(
        email_settings.SMTP_HOST,
        email_settings.SMTP_PORT,
    ) as smtp:
        smtp.login(email_settings.SMTP_LOGIN, email_settings.SMTP_PASSWORD)
        smtp.send_message(
            msg,
            to_addrs=recipients
        )
