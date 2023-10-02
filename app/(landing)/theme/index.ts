"use client"
import { extendTheme } from '@chakra-ui/react'
import { theme } from '@saas-ui/react'

import components from './components'
import { fontSizes } from './foundations/typography'

// import '@fontsource/inter/variable.css'

const styles = {
  global: (props: any) => ({
    body: {
      
      color: 'gray.900',
      bg: '#f5f4f2',
      fontSize: 'lg',
      _dark: {
        color: 'gray.600',
        bg: 'gray.900',
      },
    },
    
    _placeholder:{
      color:"gray.600",
      
    }
  }),
}

export default extendTheme(
  {
    config: {
      initialColorMode: 'dark',
      useSystemColorMode: false,
    },
    styles,
    fontSizes,
    components,
  },
  theme
)
