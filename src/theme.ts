import { DefaultMantineColor, MantineColorsTuple, createTheme } from '@mantine/core';
import { generateColors } from '@mantine/colors-generator';

type ExtendedCustomColors =
  | 'beige'
  | 'sunglow'
  | 'airblue'
  | 'forestgreen'
  | 'gunmetal'
  | DefaultMantineColor;

declare module '@mantine/core' {
  export interface MantineThemeColorsOverride {
    colors: Record<ExtendedCustomColors, MantineColorsTuple>;
  }
}

export const customeTheme = createTheme({
  white: 'var(--mantine-color-beige-0)',
  black: 'var(--mantine-color-gunmetal-9)',
  colors: {
    beige: generateColors('#EEF4D4'),
    sunglow: generateColors('#FFCE5C'),
    airblue: generateColors('#7CA5B8'),
    forestgreen: generateColors('#2E933C'),
    gunmetal: generateColors('#1C2826'),
  },
});
