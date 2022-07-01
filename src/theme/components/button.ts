import { ComponentStyleConfig } from '@chakra-ui/react'

export default <ComponentStyleConfig>{
  baseStyle: {
    padding: '0 10px',
    borderRadius: '6px',
    color: 'white.100',
    _focus: { boxShadow: 'none' },
  },
  sizes: {
    md: {
      fontSize: '18px',
    },
  },
}
