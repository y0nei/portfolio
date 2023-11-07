FROM python:3.11-slim AS dependencies

RUN pip install --no-cache-dir -U poetry poetry-plugin-export

COPY pyproject.toml poetry.lock ./
RUN poetry export -f requirements.txt --output requirements.txt

FROM python:3.11-slim as setup

ENV PATH=$PATH:/home/docker/.local/bin \
    PYTHONUNBUFFERED=1

WORKDIR /app

RUN adduser --gecos "docker" docker
RUN chown -R docker:docker /app
RUN apt update

USER docker

COPY --from=dependencies ./requirements.txt .
RUN pip install --no-cache-dir -U pip
RUN pip install --no-cache-dir -U -r requirements.txt

COPY . .

ENTRYPOINT ["python3", "main.py"]
