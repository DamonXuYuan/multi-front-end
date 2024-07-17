import React from 'react'
import { Text, Flex, HStack, Image, Button } from '@chakra-ui/react'
import eva from '@/assets/imgs/eva.png'

function Index() {
  return (
    <Flex padding="30px 60px" bgColor="white.100" justify="space-between">
      <HStack spacing="10px">
        <Image src={eva} ignoreFallback />
        <Text
          textStyle="18"
          backgroundClip="text"
          color="transparent"
          backgroundImage="linear-gradient(180deg, #5E81FF 0%, #3A68E7 100%)"
        >
          multi-front-end
        </Text>
      </HStack>
      <HStack spacing="30px" color="blue.400" textStyle="14">
        <Button bgColor="blue.100" color="white.100">
          Connect Wallet
        </Button>
        <Button bgColor="blue.100" color="white.100">
          Disconnect
        </Button>
      </HStack>
    </Flex>
  )
}

export default React.memo(Index)
