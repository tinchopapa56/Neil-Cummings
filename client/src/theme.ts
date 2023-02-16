// brand: 


import {
    extendTheme,
    withDefaultColorScheme,
    theme as baseTheme,
  } from '@chakra-ui/react'
  
export const theme = extendTheme(
    {
      colors: {
        brand: "linear-gradient(to right top, #f9f871, #fee96c, #ffdb6a, #ffcd69, #ffc06a, #ffbd6a, #ffba6a, #ffb76a, #ffbe68, #ffc566, #ffcc65, #ffd364)",
        bground: "gray.100",
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