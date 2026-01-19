from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    MONGODB_URI: str
    DATABASE_NAME: str
    SECRET_KEY: str
    ALGORITHM: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int

    model_config = SettingsConfigDict(env_file="../.env") # Adjust path relative to where app is run?

    # If running from backend/app, .env is in ../.env
    # Usually we run from backend/ so .env is in .env

settings = Settings(_env_file="backend/.env") # Try pointing to it explicitly if running from root
