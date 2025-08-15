from typing import Dict

from pydantic import BaseModel


class AOI(BaseModel):
    aoi_wkt: str


class PopulationResponse(BaseModel):
    aoi_wkt: str
    totals: Dict[str, float]
    percentages: Dict[str, float]
