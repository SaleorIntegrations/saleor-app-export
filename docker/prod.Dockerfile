FROM python:3.9-slim

ARG SSH_DEPLOYMENT_KEY

WORKDIR /app

COPY pyproject.toml poetry.lock ./

RUN apt update && \
    apt install -y git ssh

RUN pip install poetry && \
    poetry config virtualenvs.create false

RUN mkdir -p ~/.ssh && \
    ssh-keyscan github.com >> ~/.ssh/known_hosts && \
    echo "$SSH_DEPLOYMENT_KEY" >> ~/.ssh/id_rsa && \
    chmod 400 ~/.ssh/id_rsa && \
    poetry install && \
    rm -r ~/.ssh

COPY . .

CMD ["gunicorn", "--worker-class=uvicorn.workers.UvicornH11Worker", "--bind=0.0.0.0:8000", "main:app"]
