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
