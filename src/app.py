from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

from src.core.settings import settings
from src.core.logging import logger
from src.routes.home import home_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.debug(f"Settings: {settings.model_dump()}")
    logger.info("App started")
    yield
    logger.info("App shut down")

app = FastAPI(
    title=settings.APP_NAME,
    lifespan=lifespan
)

app.mount("/static", StaticFiles(directory="src/static"), name="static")
app.include_router(home_router)
