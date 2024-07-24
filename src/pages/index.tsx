import React from 'react'
import { Box, VStack, Text, Image, Flex, Icon } from '@chakra-ui/react'
import { Bell } from 'lucide-react'
import Navbar from '@/components/NavBar'
import TabBar from '@/components/TabBar'
import MhBanner from '@/assets/imgs/mh_banner.png'
const HomePage = () => {
  return (
    <Box margin="auto" pt="44px" pb="48px" bg="gray.50" minHeight="100vh">
      <Navbar title="首页" isFixed={true} />
      <VStack align="stretch" px={4} mt={4}>
        <Box bg="gray.800" borderRadius="lg" color="white" position="relative" overflow="hidden">
          <Image src={MhBanner} alt="Blind Box" objectFit="contain" width="100%" height="150px" />
        </Box>
        <Flex align="center" bg="white" p={3} borderRadius="md" boxShadow="sm" mt={5} mb={8}>
          <Icon as={Bell} mr={2} color="blue.500" />
          <Text color="gray.500">平台更新通知</Text>
        </Flex>
        <Box>
          <Text color="black" fontSize="lg" fontWeight="bold" mb={2}>
            盲盒NFT
          </Text>
          <Box width="100%" bg="white" borderRadius="xl" overflow="hidden">
            <Image src={MhBanner} objectFit="cover" width="100%" height="241px" />
            <Text color="black" fontSize="lg" fontWeight="bold" py={5} px={3}>
              多维宇宙
            </Text>
          </Box>
        </Box>
      </VStack>
      <TabBar />
    </Box>
  )
}

export default HomePage
