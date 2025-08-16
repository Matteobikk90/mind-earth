import json

import boto3
from app.config.settings import (AWS_ACCESS_KEY_ID, AWS_REGION,
                                 AWS_SECRET_ACCESS_KEY)
from app.utils.constants import BUCKET_NAME, GEOJSON_KEY
from fastapi import APIRouter, HTTPException

router = APIRouter(prefix="/api/geojson", tags=["geojson"])

s3 = boto3.client(
    "s3",
    region_name=AWS_REGION,
    aws_access_key_id=AWS_ACCESS_KEY_ID,
    aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
)


@router.get("/")
async def get_geojson():
    """Fetch GeoJSON file from S3 and return it."""
    try:
        obj = s3.get_object(Bucket=BUCKET_NAME, Key=GEOJSON_KEY)
        geojson_str = obj["Body"].read().decode("utf-8")
        geojson_data = json.loads(geojson_str)
        return geojson_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
