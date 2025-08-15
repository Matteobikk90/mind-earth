from fastapi import FastAPI

from .models import AOI, PopulationResponse

app = FastAPI()


@app.get("/api/health")
def health_check():
    return {"status": "ok"}


@app.post("/api/population_age", response_model=PopulationResponse)
def population_age(aoi: AOI):
    # Temporary dummy data — will replace with raster logic
    return PopulationResponse(
        aoi_wkt=aoi.aoi_wkt,
        totals={"lt15": 1000, "age15_64": 5000, "gt65": 1500, "all": 7500},
        percentages={"lt15": 13.33, "age15_64": 66.67, "gt65": 20.0},
    )
