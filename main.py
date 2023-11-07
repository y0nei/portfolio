import uvicorn
from src.core.settings import settings, EnvType

if __name__ == "__main__":
    uvicorn.run(
        app="src.app:app",
        host=settings.APP_HOST,
        port=settings.APP_PORT,
        log_level=settings.LOG_LEVEL,
        use_colors=True,
        reload=True if settings.ENVIRONMENT != EnvType.PRODUCTION else False,
        workers=settings.WORKERS
    )
