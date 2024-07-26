import React from 'react'
import { FlexProps, Flex, Image } from '@chakra-ui/react'
import successIcon from '@/assets/imgs/successIcon.png'
import failIcon from '@/assets/imgs/failIcon.png'

export function SuccessToast({ children, ...props }: FlexProps) {
  return (
    <Flex
      flexDir="column"
      justifyContent="center"
      alignItems="center"
      minW="108px"
      minH="80px"
      borderRadius="8px"
      bgColor="black.300"
      p="22px 12px"
      color="white.100"
      fontSize="16px"
      fontWeight="400"
      {...props}
    >
      <Image src={successIcon} w="24px" h="24px" mb="6px" />
      {children}
    </Flex>
  )
}

export function FailToast({ children, ...props }: FlexProps) {
  return (
    <Flex
      flexDir="column"
      justifyContent="center"
      alignItems="center"
      minW="108px"
      minH="80px"
      borderRadius="8px"
      bgColor="black.300"
      p="22px 12px"
      color="white.100"
      fontSize="16px"
      fontWeight="400"
      {...props}
    >
      <Image src={failIcon} w="24px" h="24px" mb="6px" />
      {children}
    </Flex>
  )
}

export function InfoToast({ children, ...props }: FlexProps) {
  return (
    <Flex
      flexDir="column"
      justifyContent="center"
      alignItems="center"
      w="168px"
      minH="80px"
      borderRadius="8px"
      bgColor="black.300"
      p="22px 12px"
      color="white.100"
      fontSize="16px"
      fontWeight="400"
      {...props}
    >
      {children}
    </Flex>
  )
}
