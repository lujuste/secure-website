import { extendTheme, ThemeConfig, useColorMode } from '@chakra-ui/react';

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

export const theme = extendTheme({
  colors: {
    purple: {
      '900': '#690da6',
    },
    pink: {
      '300': '#F05B91',
      '200': '#F05B91',
    },
    gray: {
      '100': '#f5f5f5',
    },
    brand: {
      '900': '#690da6',
    },
  },
  initialColorMode: 'light',
  useSystemColorMode: false,
  styles: {
    global: {
      body: {
        bg: 'gray.100',
        color: 'black',
      },
    },
  },
});
