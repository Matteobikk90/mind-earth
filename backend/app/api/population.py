from app.models.population import AOI, PopulationResponse
from app.services.population import get_population_stats
from fastapi import APIRouter, HTTPException

router = APIRouter(prefix="/api", tags=["population"])


@router.post("/age", response_model=PopulationResponse)
def population_age(aoi: AOI):
    try:
        stats = get_population_stats(aoi.aoi_wkt)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

    return {
        "aoi_wkt": aoi.aoi_wkt,
        "totals": stats["totals"],
        "percentages": stats["percentages"],
    }
