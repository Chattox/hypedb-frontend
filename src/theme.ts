import {
  CSSVariablesResolver,
  DefaultMantineColor,
  MantineColorsTuple,
  createTheme,
} from "@mantine/core";

type ExtendedCustomColors =
  | "hypePurplePrimary"
  | "hypePink"
  | "hypePurpleSecondary"
  | "hypeBlue"
  | "hypeGreen"
  | "hypeYellow"
  | DefaultMantineColor;

declare module "@mantine/core" {
  export interface MantineThemeColorsOverride {
    colors: Record<ExtendedCustomColors, MantineColorsTuple>;
  }
}

export const customTheme = createTheme({
  primaryColor: "hypePurplePrimary",
  colors: {
    hypePurplePrimary: [
      "#f3ecfd",
      "#dfccfb",
      "#dbc6fa",
      "#cfb4f9",
      "#c3a1f7",
      "#b78ef6",
      "#ab7bf4",
      "#a068f3",
      "#9455f1",
      "#8842f0",
    ],
    hypePink: [
      "#feebf9",
      "#fed8f3",
      "#fdc4ed",
      "#fca6e4",
      "#fb9de1",
      "#fb89da",
      "#fa75d4",
      "#f962ce",
      "#f94ec8",
      "#f83ac2",
    ],
    hypePurpleSecondary: [
      "#f1eefc",
      "#e3ddf8",
      "#d5ccf5",
      "#c8bbf2",
      "#baaaee",
      "#a08be8",
      "#9e88e7",
      "#9077e4",
      "#8266e1",
      "#7555dd",
    ],
    hypeBlue: [
      "#efecfd",
      "#e0dafc",
      "#c8bdf9",
      "#c1b4f8",
      "#b1a2f6",
      "#a28ff5",
      "#927cf3",
      "#836af1",
      "#7357ef",
      "#6344ee",
    ],
    hypeGreen: [
      "#adf32b",
      "#a5f218",
      "#9be70d",
      "#8ed40c",
      "#81c10b",
      "#6ba009",
      "#679a09",
      "#5a8708",
      "#4e7407",
      "#416006",
    ],
    hypeYellow: [
      "#fffceb",
      "#fff8c9",
      "#fff7c2",
      "#fff4ad",
      "#fff199",
      "#ffef85",
      "#ffec70",
      "#ffe95c",
      "#ffe747",
      "#ffe433",
    ],
  },
  other: {
    spacing: {
      xxs: "0.33rem",
    },
  },
});

export const resolver: CSSVariablesResolver = (theme) => ({
  variables: {
    "--mantine-spacing-xxs": theme.other.spacing.xxs,
  },
  light: {
    "--mantine-color-background-gradient":
      "linear-gradient(135deg, var(--mantine-color-hypePurplePrimary-4), var(--mantine-color-hypePink-4))",
    "--mantine-color-table-header-gradient":
      "linear-gradient(90deg, var(--mantine-color-hypePurplePrimary-9), var(--mantine-color-hypePink-9))",
  },
  dark: {},
});
