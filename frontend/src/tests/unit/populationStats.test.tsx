import PopulationStats from "@/components/map/PopulationStats";
import type { PopulationStatsType } from "@/types/population";
import { render, screen } from "@testing-library/react";

const mockStats: PopulationStatsType = {
  aoi_wkt: "",
  name: "TestRegion",
  country: "TS",
  totals: { all: 1000, lt15: 200, age15_64: 700, gt65: 100 },
  percentages: { lt15: 20, age15_64: 70, gt65: 10 },
};

describe("PopulationStats", () => {
  it("renders population data correctly", () => {
    render(<PopulationStats populationStats={mockStats} isLoading={false} />);

    expect(screen.getByText(/Total:/)).toBeInTheDocument();
    expect(screen.getByText(/200/)).toBeInTheDocument();
    expect(screen.getByText(/700/)).toBeInTheDocument();
    expect(screen.getByText(/100/)).toBeInTheDocument();
  });

  it("shows loader while loading", () => {
    render(<PopulationStats populationStats={null} isLoading={true} />);
    expect(screen.getByRole("status", { name: "Loading" })).toBeInTheDocument();
  });
});
