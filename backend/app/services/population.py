from app.utils.constants import COGS
from app.utils.raster import sum_raster_over_geom
from shapely import wkt


def get_population_stats(aoi_wkt: str):
    geom = wkt.loads(aoi_wkt)

    totals = {key: sum_raster_over_geom(path, geom) for key, path in COGS.items()}
    totals["all"] = sum(totals.values())

    percentages = (
        {key: 0 for key in ["lt15", "age15_64", "gt65"]}
        if totals["all"] == 0
        else {
            key: round(100 * totals[key] / totals["all"], 2)
            for key in ["lt15", "age15_64", "gt65"]
        }
    )

    return {"totals": totals, "percentages": percentages}
