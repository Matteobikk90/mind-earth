"use client";

import Loader from "@/components/Loader";
import type { PopulationStatsType } from "@/types/population";

export default function PopulationStats({
  populationStats,
  isLoading,
}: {
  populationStats: PopulationStatsType | null;
  isLoading: boolean;
}) {
  if (!populationStats && !isLoading) return null;

  return (
    <aside>
      {isLoading ? (
        <Loader />
      ) : (
        populationStats && (
          <>
            <h3 className="border-foreground/20 border-b pb-1 text-sm font-semibold">
              {populationStats.name}, {populationStats.country}
            </h3>
            <ul className="space-y-1 text-xs">
              <li>
                <span className="font-medium">Total:</span>{" "}
                {populationStats.totals.all.toLocaleString()}
              </li>
              <li>
                <span className="font-medium">Under 15:</span> {populationStats.percentages.lt15}% (
                {populationStats.totals.lt15.toLocaleString()})
              </li>
              <li>
                <span className="font-medium">Age 15–64:</span>{" "}
                {populationStats.percentages.age15_64}% (
                {populationStats.totals.age15_64.toLocaleString()})
              </li>
              <li>
                <span className="font-medium">65+:</span> {populationStats.percentages.gt65}% (
                {populationStats.totals.gt65.toLocaleString()})
              </li>
            </ul>
          </>
        )
      )}
    </aside>
  );
}
