import strawberry
import uvicorn
from fastapi import Depends
from saleor_app_base.main import configure_application
from strawberry.fastapi import GraphQLRouter

from app.graphql.mutations import Mutation
from app.graphql.query import Query
from db import get_db

app = configure_application()


async def get_context(db=Depends(get_db)):
    return {
        "db": db,
    }


schema = strawberry.Schema(Query, Mutation)
graphql_app = GraphQLRouter(schema, context_getter=get_context)
app.include_router(graphql_app, prefix="/graphql")


if __name__ == "__main__":
    uvicorn.run(app, port=5000)
