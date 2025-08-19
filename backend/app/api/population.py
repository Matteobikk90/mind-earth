from app.models.population import AOI, PopulationResponse
from app.services.population import get_population_stats
from fastapi import APIRouter, HTTPException, Request
from fastapi.concurrency import run_in_threadpool

router = APIRouter(prefix="/api", tags=["population"])


@router.post("/population_age", response_model=PopulationResponse)
async def population_age(aoi: AOI, request: Request):
    try:
        # check for aborted calls
        if await request.is_disconnected():
            raise HTTPException(status_code=499, detail="Client Closed Request")

        stats = await run_in_threadpool(get_population_stats, aoi.aoi_wkt)

        # optionally check again for aborted calls
        if await request.is_disconnected():
            raise HTTPException(status_code=499, detail="Client Closed Request")

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

    return {
        "aoi_wkt": aoi.aoi_wkt,
        "totals": stats["totals"],
        "percentages": stats["percentages"],
    }
