"use client";

import Filters from "@/components/map/Filters";
import PopulationStats from "@/components/map/PopulationStats";
import localGeoJSON from "@/data/geojson.json";
import { getPopulationAge } from "@/queries/populationAge";
import { useStore } from "@/store";
import type { PopulationResponseType } from "@/types/map";
import {
  controller,
  getColor,
  getPopulationDensity,
  initialViewState,
  lineColors,
  lineWidth,
  speedAnimation,
  type CustomViewState,
} from "@/utils/map";
import { getTooltipPosition, tooltipContainerStyle, tooltipHtmlTemplate } from "@/utils/tooltip";
import { FlyToInterpolator, WebMercatorViewport } from "@deck.gl/core";
import { GeoJsonLayer } from "@deck.gl/layers";
import DeckGL from "@deck.gl/react";
import { useMutation } from "@tanstack/react-query";
import area from "@turf/area";
import bbox from "@turf/bbox";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useRef, useState } from "react";
import { useShallow } from "zustand/shallow";

export default function PopulationMap() {
  const mapContainerRef = useRef<HTMLElement | null>(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";
  // const { data, isLoading, error } = useQuery<PopulationResponseType>({
  //   queryKey: ["geojson"],
  //   queryFn: fetchGeoJSON,
  // })
  const {
    mutate: fetchPopulationAge,
    data: populationAgeData,
    isPending: isLoadingPopulationAge,
  } = useMutation({
    mutationKey: ["populationAge"],
    mutationFn: getPopulationAge,
  });

  const { palette, threshold } = useStore(
    useShallow(({ palette, threshold }) => ({
      palette,
      threshold,
    }))
  );
  const data: PopulationResponseType = localGeoJSON as PopulationResponseType;
  const [viewState, setViewState] = useState(initialViewState);

  useEffect(() => {
    if (!data) return;

    // Filter out small polygons (tiny islands) - so mainland is centered
    const mainlandFeatures = {
      ...data,
      features: data.features.filter((f) => area(f) > 5e8),
    };

    const filtered = mainlandFeatures.features.length > 0 ? mainlandFeatures : data;

    const bounds = bbox(filtered);

    const clampedBounds: [[number, number], [number, number]] = [
      [Math.max(bounds[0], -15), Math.max(bounds[1], 30)],
      [Math.min(bounds[2], 40), Math.min(bounds[3], 70)],
    ];

    const { longitude, latitude, zoom } = new WebMercatorViewport({
      width: window.innerWidth,
      height: window.innerHeight,
    }).fitBounds(clampedBounds, { padding: 50 });

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
        id: `population-layer-${theme}-${palette}-${threshold ?? "none"}`,
        data,
        pickable: true,
        onClick: ({ object }) => {
          if (object) {
            fetchPopulationAge({
              feature: object,
              name: object.properties.NUTS_NAME,
              country: object.properties.CNTR_CODE,
            });
          }
        },
        getFillColor: (feature) => {
          const density = getPopulationDensity(feature);

          if (threshold !== null && density < threshold) {
            return [200, 200, 200, 80];
          }

          return getColor(density, palette, isDark);
        },
        getLineColor: lineColors.black,
        lineWidthMinPixels: lineWidth,
      }),
    ];
  }, [data, palette, threshold, isDark, fetchPopulationAge, theme]);

  // if (isLoading) {
  //   return (
  // <Loader />;
  //   );
  // }

  // if (error) {
  //   return <p className="text-red-500">Failed to load map data</p>;
  // }

  return (
    <>
      <article ref={mapContainerRef} aria-label="map">
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
      <Filters />
      <PopulationStats populationStats={populationAgeData} isLoading={isLoadingPopulationAge} />
    </>
  );
}
