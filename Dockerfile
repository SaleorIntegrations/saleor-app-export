# Build frontend images
FROM node:latest as frontend

ARG FRONTEND_DEPLOY_KEY
ARG STATIC_URL
ARG API_URL

WORKDIR /ui

RUN apt-get update && apt-get install -y git

RUN mkdir /root/.ssh/ && \
    echo "${FRONTEND_DEPLOY_KEY}" > /root/.ssh/id_rsa && \
    touch /root/.ssh/known_hosts && \
    ssh-keyscan github.com >> /root/.ssh/known_hosts && \
    chmod 0700 ~/.ssh/*

COPY ./ui/package-lock.json .
COPY ./ui/package.json .

RUN npm install

COPY ./ui/ .

RUN PUBLIC_URL=${STATIC_URL} REACT_APP_APP_URL=${API_URL} npm run build


## Install poetry dependencies
FROM python:3.9-slim as poetry

ARG BACKEND_DEPLOY_KEY

WORKDIR /app

RUN apt-get update && apt-get install -y gcc git

RUN mkdir /root/.ssh/ && \
    echo "${BACKEND_DEPLOY_KEY}" > /root/.ssh/id_rsa && \
    touch /root/.ssh/known_hosts && \
    ssh-keyscan github.com >> /root/.ssh/known_hosts && \
    chmod 0700 ~/.ssh/*

## Install python dependencies
COPY poetry.lock .
COPY pyproject.toml .
RUN pip install --no-cache-dir poetry && \
    poetry config virtualenvs.in-project true && \
    poetry install

# Build python app
FROM python:3.9-slim as export-app

WORKDIR /app

# Copy all app files
COPY . .

# Copy react artifacts from the previous stage
COPY --from=frontend /ui/build ./ui/build

# Copy virtualenv from poetry
COPY --from=poetry /app/.venv ./.venv

CMD source /app/.venv/bin/activate && uvicorn --host=0.0.0.0 --port=8000 main:app