import React from 'react'
import {
  ChakraProvider,
  Box,
  VStack,
  Heading,
  Text,
  Button,
  Image,
  HStack,
  Badge,
} from '@chakra-ui/react'
// import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

const MultiDimensionalUniversePage = () => {
  return (
    <ChakraProvider>
      <Box maxWidth="400px" margin="auto" p={4}>
        <HStack justifyContent="space-between" mb={4}>
          {/* <ChevronLeftIcon /> */}
          <Heading size="md">多维宇宙</Heading>
          <Box width="24px" /> {/* Placeholder for alignment */}
        </HStack>

        <Image
          src="/api/placeholder/400/200"
          alt="Multi-dimensional Universe"
          borderRadius="lg"
          mb={4}
        />

        <VStack align="stretch" spacing={4}>
          <HStack justifyContent="space-between">
            <Heading size="md">多维宇宙</Heading>
            <Badge colorScheme="teal">限量 100件</Badge>
          </HStack>
          {/* <Button rightIcon={<ChevronRightIcon />} variant="outline"> */}
          开盒记录
          {/* </Button> */}
          <Box bg="gray.50" p={4} borderRadius="md">
            <Heading size="sm" mb={2}>
              盲盒活动说明
            </Heading>
            <VStack align="stretch" spacing={1}>
              <Text fontSize="sm">1、新用户专属NFT，7天后可再次领取</Text>
              <Text fontSize="sm">2、邀请新用户，减少领取倒计时3小时</Text>
              <Text fontSize="sm">3、累计邀请50位新用户，每小时可再领取1个NFT</Text>
              <Text fontSize="sm">4、完成邀请任务，最高可领取24个NFT</Text>
            </VStack>
          </Box>
          <Button colorScheme="blue">邀请好友</Button>
          <Box bg="gray.50" p={4} borderRadius="md">
            <Heading size="sm" mb={2}>
              当前NFT
            </Heading>
            <VStack align="stretch" spacing={1}>
              <Text fontSize="sm">累计邀请：12人</Text>
              <Text fontSize="sm">已减少：36小时</Text>
              <Text fontSize="sm">下次领取时间：2024-06-01 12:23:04</Text>
            </VStack>
          </Box>
          <Button isDisabled>待领取</Button>
        </VStack>
      </Box>
    </ChakraProvider>
  )
}

export default MultiDimensionalUniversePage
