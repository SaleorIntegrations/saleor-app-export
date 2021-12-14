FROM python:3.9

RUN apt-get update \
    && apt-get install -y vim git \
    && apt-get install -y python3-pip python3-dev libpq-dev wget \
    && apt-get install -y libpq-dev \
    && apt-get autoremove -y --purge \
    && apt-get autoclean


WORKDIR /usr/src/app

RUN pip install poetry

COPY ./poetry.lock /usr/src/app/poetry.lock

RUN poetry install 

COPY . /usr/src/app

VOLUME /usr/src/app

CMD ["python", "main.py"]
