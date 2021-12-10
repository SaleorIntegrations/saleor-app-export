import uvicorn
from saleor_app_base.main import configure_application

from .app.router import router

app = configure_application(router)

if __name__ == "__main__":
    uvicorn.run(app)
