import { expect, test } from "@playwright/test";

test("Population Map › loads map and applies filters", async ({ page }) => {
  // Mock auth
  await page.route("**/api/auth/me", (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ id: 1, name: "Test User", email: "test@example.com" }),
    })
  );

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
