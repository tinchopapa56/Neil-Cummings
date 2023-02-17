// brand: 


import {
    extendTheme,
    withDefaultColorScheme,
    theme as baseTheme,
  } from '@chakra-ui/react'
  
export const theme = extendTheme(
    {
      colors: {
        brand: "#6be371",
        bground: "gray.100",
      },
      components: {
        Link: {
          baseStyle: {
            '&:hover': { textDecoration: 'none' },
          },
        },
      }
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