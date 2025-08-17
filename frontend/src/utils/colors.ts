import type { PaletteKey } from "@/types/palette";

export const sequentialPalettes = {
  blue: {
    10: "#EEEEF8",
    20: "#DCDDF0",
    30: "#CBCCE9",
    40: "#BABBE1",
    50: "#A8AADB",
    60: "#979AD4",
    70: "#878AD6",
    80: "#6F73D2",
    90: "#5F63C9",
    100: "#5256BE",
  },
  green: {
    10: "#EEF6F2",
    20: "#DFECE5",
    30: "#CFE4D9",
    40: "#C0DBCC",
    50: "#B0D2C0",
    60: "#A0C9B4",
    70: "#92BFA7",
    80: "#82B79A",
    90: "#5DB18A",
    100: "#4FA77E",
  },
  orange: {
    10: "#fef8ee",
    20: "#fdf1dd",
    30: "#fbeacd",
    40: "#fae3bb",
    50: "#f9ddab",
    60: "#f8d59b",
    70: "#f7ce8b",
    80: "#f6c77b",
    90: "#fdbf63",
    100: "#ff8649",
  },
};

export const palettes: PaletteKey[] = ["blue", "green", "orange"];
