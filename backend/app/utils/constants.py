import os

from dotenv import load_dotenv

load_dotenv()

S3_PREFIX = "s3://me-interview-task/be-data"
COGS = {
    "lt15": f"{S3_PREFIX}/pop_lt15.tiff",
    "age15_64": f"{S3_PREFIX}/pop_1564.tiff",
    "gt65": f"{S3_PREFIX}/pop_gt65.tiff",
}
DATABASE_URL = os.getenv("DATABASE_URL")

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

ALLOW_ORIGINS = [
    "http://localhost:3000",
    "https://yourfrontend.com",
]
