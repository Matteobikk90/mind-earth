import boto3
from app.config.settings import (AWS_ACCESS_KEY_ID, AWS_REGION,
                                 AWS_SECRET_ACCESS_KEY)
from rasterio.session import AWSSession

session = boto3.Session(
    aws_access_key_id=AWS_ACCESS_KEY_ID,
    aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
    region_name=AWS_REGION,
)


def get_rasterio_env():
    """Return rasterio environment with AWS session."""
    return AWSSession(session)
