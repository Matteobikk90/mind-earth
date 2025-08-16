"use client";

import { fetchGeoJSON } from "@/queries/geoJson";
import { GeoJsonLayer } from "@deck.gl/layers";
import DeckGL from "@deck.gl/react";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export default function PopulationMap() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["geojson"],
    queryFn: fetchGeoJSON,
  });

  const layers = useMemo(() => {
    if (!data) return [];
    return [
      new GeoJsonLayer({
        id: "population-layer",
        data,
        pickable: true,
        stroked: true,
        filled: true,
        extruded: false,
        // getFillColor: (f: any) => {
        //   const density = f.properties.T_sum / f.properties.AREA;
        //   return density > 1000 ? [200, 0, 0, 180] : [0, 200, 100, 180];
        // },
        getLineColor: [255, 255, 255],
        lineWidthMinPixels: 1,
      }),
    ];
  }, [data]);

  if (isLoading) {
    return (
      <div className="flex h-[80vh] w-full items-center justify-center">
        <span className="h-12 w-12 animate-spin rounded-full border-4 border-blue-400 border-t-transparent"></span>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500">Failed to load map data</p>;
  }

  return (
    <DeckGL
      initialViewState={{
        longitude: 10,
        latitude: 50,
        zoom: 3.5,
        bearing: 0,
        pitch: 0,
      }}
      controller={true}
      layers={layers}
      getTooltip={({ object }) =>
        object && {
          html: `
            <b>Population:</b> ${object.properties.T_sum}<br/>
            <b>Male:</b> ${object.properties.M_sum}<br/>
            <b>Female:</b> ${object.properties.F_sum}
          `,
        }
      }
      style={{ width: "100%", height: "80vh" }}
    />
  );
}
