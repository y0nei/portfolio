from enum import Enum
from pydantic_settings import BaseSettings

class EnvType(str, Enum):
    DEVELOPMENT = "development"
    PRODUCTION = "production"

class Settings(BaseSettings):
    APP_NAME: str = "FastAPI App"
    LOG_LEVEL: str = "info"
    ENVIRONMENT: str = EnvType.DEVELOPMENT
    APP_HOST: str = "0.0.0.0"
    APP_PORT: int = 8000
    WORKERS: int = 1

    class Config:
        env_file = ".env"
        case_sensitive = True

settings: Settings = Settings()
