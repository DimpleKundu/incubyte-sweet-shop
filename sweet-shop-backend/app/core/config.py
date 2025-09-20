from pydantic_settings  import BaseSettings
from dotenv import load_dotenv
import os

load_dotenv()
class Settings(BaseSettings):
    MONGO_URI: str = os.getenv("MONGO_URI")
    MONGO_DB_NAME: str = "sweetshop"
    SECRET_KEY: str = "supersecret"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int  = 60

    class Config:
        env_file = ".env"

    
settings = Settings()

