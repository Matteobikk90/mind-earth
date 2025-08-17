"use client";

import localGeoJSON from "@/data/geojson.json";
import type { PopulationResponseType } from "@/types/map";
import {
  controller,
  getColor,
  getPopulationDensity,
  initialViewState,
  speedAnimation,
  tooltipHtmlTemplate,
  type CustomViewState,
} from "@/utils/map";
import { getTooltipPosition, tooltipContainerStyle } from "@/utils/tooltip";
import { FlyToInterpolator, WebMercatorViewport } from "@deck.gl/core";
import { GeoJsonLayer } from "@deck.gl/layers";
import DeckGL from "@deck.gl/react";
import bbox from "@turf/bbox";
import { useEffect, useMemo, useRef, useState } from "react";

export default function PopulationMap() {
  const mapContainerRef = useRef<HTMLElement | null>(null);
  // const { data, isLoading, error } = useQuery<PopulationResponseType>({
  //   queryKey: ["geojson"],
  //   queryFn: fetchGeoJSON,
  // });
  const data: PopulationResponseType = localGeoJSON as PopulationResponseType;
  const [viewState, setViewState] = useState(initialViewState);

  useEffect(() => {
    if (!data) return;

    const bounds = bbox(data);

    const { longitude, latitude, zoom } = new WebMercatorViewport({
      width: window.innerWidth,
      height: window.innerHeight,
    }).fitBounds(
      [
        [bounds[0], bounds[1]],
        [bounds[2], bounds[3]],
      ],
      { padding: 50 }
    );

    setViewState((prev) => ({
      ...prev,
      longitude,
      latitude,
      zoom,
      transitionInterpolator: new FlyToInterpolator({ speed: speedAnimation }),
      transitionDuration: "auto" as const,
    }));
  }, [data]);

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
        getFillColor: (feature) => {
          const density = getPopulationDensity(feature);
          return getColor(density);
        },
        getLineColor: [255, 255, 255],
        lineWidthMinPixels: 0.5,
      }),
    ];
  }, [data]);

  // if (isLoading) {
  //   return (
  //     <div className="flex h-[80vh] w-full items-center justify-center">
  //       <span className="h-12 w-12 animate-spin rounded-full border-4 border-blue-400 border-t-transparent"></span>
  //     </div>
  //   );
  // }

  // if (error) {
  //   return <p className="text-red-500">Failed to load map data</p>;
  // }

  return (
    <article ref={mapContainerRef}>
      <DeckGL
        viewState={viewState}
        controller={controller}
        layers={layers}
        onViewStateChange={({ viewState }) => {
          setViewState(viewState as CustomViewState);
        }}
        getTooltip={({ object, x, y }) => {
          if (!object || !mapContainerRef.current) return null;

          const tooltipWrapper = mapContainerRef.current.querySelector(".deck-tooltip");
          const tooltipBounds = tooltipWrapper?.getBoundingClientRect();

          if (!tooltipBounds) {
            return null;
          }

          return {
            html: tooltipHtmlTemplate(object),
            style: {
              ...(tooltipContainerStyle as CSSStyleDeclaration),
              transform: getTooltipPosition(x, y, tooltipBounds),
            },
          };
        }}
        style={{ width: "100%", height: "100vh" }}
      />
    </article>
  );
}
