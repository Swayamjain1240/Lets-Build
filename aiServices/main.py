from fastapi import FastAPI

from api.health import router as health_router
from api.recommendation import router as recommendation_router
from config.setting import settings

app = FastAPI(
    title = settings.APP_NAME,
    version = settings.APP_VERSION
)

app.include_router(
    health_router,
    prefix="/api"
)

app.include_router(
    recommendation_router,
    prefix="/api"
)

@app.get("/")
def root():
    return{
        "success":True,
        "message": "Let's build is running"
    }