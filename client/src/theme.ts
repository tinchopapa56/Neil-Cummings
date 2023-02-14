// brand: 


import {
    extendTheme,
    withDefaultColorScheme,
    theme as baseTheme,
  } from '@chakra-ui/react'
  
export const theme = extendTheme(
    {
      colors: {
        // brand: "#C3FCF1",
        // brand: "linear-gradient(to right top, #cbfff5, #beffe6, #bcffcf, #c7ffb2, #dbfb93);" ,
        // brand: "linear-gradient(to right top, #cbfff5, #cbffeb, #d1ffde, #ddffd0, #ecffc2);",
        // brand: "linear-gradient(to right top, #e7fffa, #e3fff4, #e3ffeb, #e8ffe0, #f1ffd5);",
        brand: "linear-gradient(to right top, #ebfbf8, #ecfdf6, #eefef3, #f2ffef, #f8ffeb);",
      },
    //   components: {
    //     Alert: {
    //       defaultProps: {
    //         colorScheme: 'blue',
    //       },
    //     },
    //   },
    },
    withDefaultColorScheme({ colorScheme: 'brand' }),
  )