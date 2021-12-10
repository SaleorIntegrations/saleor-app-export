import uvicorn

from saleor_app_base.main import configure_application

from app.products.api import router as products_router


app = configure_application()
app.include_router(products_router)

if __name__ == "__main__":
    uvicorn.run(app)
