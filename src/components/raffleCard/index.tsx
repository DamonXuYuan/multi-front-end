import React from 'react'
import { Flex, Image, Text, FlexProps } from '@chakra-ui/react'
import tagBg from '@/assets/imgs/tagBg.png'

export interface RaffleCardProps {
  img: string
  name: string
  range: string
  price: string | number
  unit?: string
  time?: string
  type?: string
}

interface IProps extends FlexProps {
  raffleCard: RaffleCardProps
}

function Index({ raffleCard, ...props }: IProps) {
  return (
    <Flex
      flexDir="column"
      bgColor="white.100"
      w="full"
      minH="323px"
      borderRadius="16px"
      overflow="hidden"
      pos="relative"
      boxShadow="0px 4px 96px 1px rgba(197,197,197,0.25)"
      {...props}
    >
      {/* Tag */}
      {raffleCard?.type && (
        <Flex
          w="90px"
          h="30px"
          justifyContent="center"
          alignItems="center"
          pos="absolute"
          top="0"
          right="0"
          borderTopRightRadius="16px"
          borderBottomLeftRadius="16px"
        >
          <Image src={tagBg} w="full" h="30px" pos="absolute" top="0" right="0" />
          <Text zIndex="1" color="white.100" fontSize="12px">
            {raffleCard?.time && `${raffleCard?.time} | `}
            {raffleCard?.type}
          </Text>
        </Flex>
      )}
      <Image w="full" h="240px" alt="photo" src={raffleCard.img} />
      <Flex p="16px 12px" boxSizing="border-box" justifyContent="space-between">
        {/* Left */}
        <Flex flexDir="column" justifyContent="space-between">
          <Text color="black.200" fontSize="16px" lineHeight="1" fontWeight="600" mb="16px">
            {raffleCard.name}
          </Text>
          <Text color="gray.300" fontSize="14px" lineHeight="1" fontWeight="400">
            {raffleCard.range}
          </Text>
        </Flex>
        <Flex flexDir="column" justifyContent="center">
          <Text color="black.200" fontSize="24px" lineHeight="1" fontWeight="600">
            {raffleCard?.unit ?? '$'}
            {raffleCard.price}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default React.memo(Index)
