import rasterio
from app.utils.aws import get_rasterio_env
from pyproj import Transformer
from rasterio.mask import mask
from shapely import wkt
from shapely.geometry import mapping


def reproject_geom_to_match(src_crs, geom):
    """Reproject a Shapely geometry to match raster CRS."""
    transformer = Transformer.from_crs("EPSG:4326", src_crs, always_xy=True)
    new_coords = [transformer.transform(x, y) for x, y in geom.exterior.coords]
    return type(geom)(new_coords)


def sum_raster_over_geom(path, geom_geojson):
    """Clip raster to geometry and sum values."""
    with rasterio.Env(get_rasterio_env()):
        with rasterio.open(path) as src:
            # Reproject geometry to raster's CRS
            geom_shapely = (
                wkt.loads(geom_geojson)
                if isinstance(geom_geojson, str)
                else geom_geojson
            )
            geom_projected = reproject_geom_to_match(src.crs, geom_shapely)
            out_image, _ = mask(src, [mapping(geom_projected)], crop=True)

            data = out_image[0]
            nodata = src.nodata
            if nodata is not None:
                data = data[data != nodata]
            return float(data.sum())
