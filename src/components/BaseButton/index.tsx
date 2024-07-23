import React from 'react'
import { ButtonProps, Button } from '@chakra-ui/react'

interface IProps extends ButtonProps {
  children?: React.ReactNode
}

function Index({ children, ...props }: IProps) {
  return (
    <Button
      w="full"
      h="40px"
      borderRadius="28px"
      bgColor="black.200"
      p="0"
      m="0"
      textAlign="center"
      color="white.100"
      fontSize="16px"
      fontWeight="600"
      {...props}
    >
      {children}
    </Button>
  )
}

export default React.memo(Index)
