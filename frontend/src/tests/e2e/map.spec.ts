import { expect, test } from "@playwright/test";

test("Population Map › loads map and applies filters", async ({ page, context }) => {
  // Mock auth
  await page.route("**/api/auth/me", (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ id: 1, name: "Test User", email: "test@example.com" }),
    })
  );

  // Mock geojson
  await page.route("**/api/geojson", (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: { NUTS_NAME: "Testland", CNTR_CODE: "TST" },
            geometry: {
              type: "Polygon",
              coordinates: [
                [
                  [10, 40],
                  [20, 40],
                  [20, 50],
                  [10, 50],
                  [10, 40],
                ],
              ],
            },
          },
        ],
      }),
    })
  );

  // Add cookie so middleware allows /map
  await context.addCookies([
    {
      name: "access_token",
      value: "fake-token",
      url: "http://localhost:3000",
    },
  ]);

  await page.goto("/map");

  // Filters aside
  await expect(page.getByRole("complementary", { name: "filters" })).toBeVisible();

  // Change palette
  const paletteSelect = page.getByRole("combobox", { name: "Color Palette" });
  await paletteSelect.selectOption("green");
  await expect(paletteSelect).toHaveValue("green");

  // Toggle density filter
  const densityCheckbox = page.getByRole("checkbox", { name: /exclude density/i });
  await densityCheckbox.check();
  await expect(densityCheckbox).toBeChecked();
  await densityCheckbox.uncheck();
  await expect(densityCheckbox).not.toBeChecked();
});
