from app.api.population import get_population_stats
from app.models.population import AOI, PopulationResponse
from fastapi import FastAPI, HTTPException

app = FastAPI()


@app.get("/api/health")
def health_check():
    return {"status": "ok"}


@app.post("/api/population_age", response_model=PopulationResponse)
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
