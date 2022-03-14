from pydantic import BaseSettings, EmailStr


class EmailSettings(BaseSettings):
    FROM_ADDRESS: EmailStr
    SMTP_LOGIN: str
    SMTP_PASSWORD: str
    SMTP_HOST: str
    SMTP_PORT: int
