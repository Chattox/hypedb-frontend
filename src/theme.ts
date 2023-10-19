import { DefaultMantineColor, MantineColorsTuple, createTheme } from '@mantine/core';
import { generateColors } from '@mantine/colors-generator';

type ExtendedCustomColors =
  | 'beige'
  | 'teagreen'
  | 'coral'
  | 'rust'
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
    teagreen: generateColors('#DAEFB3'),
    coral: generateColors('#EA9E8D'),
    rust: generateColors('#D64550'),
    gunmetal: generateColors('#1C2826'),
  },
});
