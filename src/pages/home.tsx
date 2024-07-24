import React from 'react'
import { Box, VStack, Text, Image, Flex } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import Navbar from '@/components/NavBar'
import TabBar from '@/components/TabBar'
import MhBanner from '@/assets/imgs/mhBanner.png'
import notice from '@/assets/imgs/notice.png'
const HomePage = () => {
  const router = useRouter()
  const goBoxPage = () => {
    router.push('/box')
  }
  return (
    <Box margin="auto" pt="44px" pb="48px" bg="gray.50" minHeight="100vh">
      <Navbar title="首页" isFixed={true} />
      <VStack align="stretch" px={4} mt={4}>
        <Box bg="gray.800" borderRadius="lg" color="white" position="relative" overflow="hidden">
          <Image src={MhBanner} alt="Blind Box" objectFit="contain" width="100%" height="175px" />
        </Box>
        <Flex align="center" bg="white" p={3} borderRadius="3xl" boxShadow="sm" mt={5} mb={8}>
          <Image src={notice} w="20px" h="20px" mr="5px"></Image>
          <Text color="gray.500">平台更新通知</Text>
        </Flex>
        <Box>
          <Text color="black" fontSize="lg" fontWeight="bold" mb={2}>
            盲盒NFT
          </Text>
          <Box width="100%" bg="white" borderRadius="xl" overflow="hidden" onClick={goBoxPage}>
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
