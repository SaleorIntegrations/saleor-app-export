# Export app

## How to apply migrations

Before running the project the migrations have to be applied.

There are two types of them:
- Internal migrations, which are created in the app
- External migrations, which are created in the `saleor_app_base`

To apply the internal migrations run:

```
alembic upgrade head
```

To apply the external migrations run:

```
manage.py alembic upgrade head
```



## How to run

Simply perform this command
```
python main.py
```

It will run the app with `Uvicorn`, an ASGI server.

You also need to specify at least these two variables:
- `SQLALCHEMY_DB_URI` (e.g. `postgresql+asyncpg://<host>/<database_name>`)
- `SITE_URL` (this is the URL of the app)

## Known problems

### Dependencies

Dependencies are specified in the `pyproject.toml` file and installed by poetry.

Some of them, however, have conflicts with some dependencies in the `saleor_app_base`. 

To fix that, we need to update the conflicting dependencies there. As a temporary solution, required dependencies can be installed via `pip`