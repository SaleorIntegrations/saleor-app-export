import smtplib
from email.message import EmailMessage
from typing import List
import dataclasses
import smtplib
from base64 import encodebytes
from email.message import EmailMessage
from email.mime.base import MIMEBase
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from typing import List, Union

from app.core.export.email import email_settings


@dataclasses.dataclass
class Attachment:
    content: bytes
    filename: str


def send_email(
    subject: str,
    content: str,
    recipients: List[str],
    attachments: List[Attachment],
):
    message = MIMEMultipart()
    message["Subject"] = subject
    message["From"] = email_settings.FROM_ADDRESS

    message.attach(MIMEText(content))

    for attachment in attachments:
        part = MIMEBase("application", "octet-stream")
        part.set_payload(encodebytes(attachment.content).decode())
        part.add_header("Content-Transfer-Encoding", "base64")
        part.add_header(
            "Content-Disposition", 'attachment; filename="%s"' % attachment.filename
        )
        message.attach(part)

    with smtplib.SMTP_SSL(
        email_settings.SMTP_HOST,
        email_settings.SMTP_PORT,
    ) as smtp:
        smtp.login(email_settings.SMTP_LOGIN, email_settings.SMTP_PASSWORD)
        smtp.send_message(message, to_addrs=recipients)
