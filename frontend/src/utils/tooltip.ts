import type { PopulationTooltipType } from "@/types/map";
import type { CSSProperties } from "react";

const TOOLTIP_MARGIN = 12;

export const tooltipContainerStyle: CSSProperties = {
  color: "white",
  padding: "0.75rem 1rem",
  display: "flex",
  flexDirection: "column",
  borderRadius: "0.5rem",
  zIndex: 11,
  backgroundColor: "rgba(19, 23, 61, 0.7)",
  backdropFilter: "blur(12px)",
  maxWidth: "20rem",
  width: "fit-content",
  border: "1px solid rgba(255, 255, 255, 0.15)",
  transition: "transform 0.15s ease-out",
  pointerEvents: "none",
};

export const getTooltipPosition = (
  x: number,
  y: number,
  tooltipBounds: DOMRect,
  margin: number = TOOLTIP_MARGIN
): string => {
  let posX = x;
  let posY = y;

  if (x + tooltipBounds.width + margin > window.innerWidth) {
    posX = x - tooltipBounds.width - margin;
  }

  if (y + tooltipBounds.height + margin > window.innerHeight) {
    posY = y - tooltipBounds.height - margin;
  }

  return `translate(${posX}px, ${posY}px)`;
};

export function tooltipHtmlTemplate(feature: PopulationTooltipType): string {
  const {
    NUTS_NAME,
    CNTR_CODE,
    COAST_TYPE,
    LEVL_CODE,
    NAME_LATN,
    URBN_TYPE,
    M_sum,
    MOUNT_TYPE,
    T_sum,
    F_sum,
    NUTS_ID,
    pixel_count,
  } = feature.properties;

  return `
    <div style="border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 6px; margin-bottom: 6px;">
      <h3 style="margin: 0; font-size: 14px; font-weight: 600;">
        ${NUTS_NAME} (${CNTR_CODE})
      </h3>
      <small style="opacity: 0.7;">${NAME_LATN} — ID: ${NUTS_ID}</small>
    </div>

    <div style="font-size: 12px; line-height: 1.4;">
      <div style="display: flex; justify-content: space-between;">
        <span>Total Population:</span>
        <span><b>${T_sum.toLocaleString()}</b></span>
      </div>
      <div style="display: flex; justify-content: space-between;">
        <span>Male:</span>
        <span>${M_sum.toLocaleString()}</span>
      </div>
      <div style="display: flex; justify-content: space-between;">
        <span>Female:</span>
        <span>${F_sum.toLocaleString()}</span>
      </div>
      <div style="display: flex; justify-content: space-between;">
        <span>Pixel Count:</span>
        <span>${pixel_count.toLocaleString()}</span>
      </div>
    </div>

    <div style="margin-top: 6px; font-size: 11px; opacity: 0.7;">
      Level: ${LEVL_CODE} | Urban: ${URBN_TYPE} | Coast: ${COAST_TYPE} | Mountain: ${MOUNT_TYPE}
    </div>
  `;
}
