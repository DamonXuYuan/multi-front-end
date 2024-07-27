import React from 'react'
import { Box, VStack, Heading, Text, Button, Image, HStack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import Navbar from '@/components/NavBar'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import MhBanner from '@/assets/imgs/mhBanner.png'
import tealBg from '@/assets/imgs/tealBg.png'
const BoxPage = () => {
  const router = useRouter()
  const handleBack = () => {
    router.back()
  }

  return (
    <Box margin="auto" pt="44px" pb="48px" bg="white" minHeight="100vh">
      <Navbar title="多维宇宙" isFixed={true} leftContent={<ChevronLeft onClick={handleBack} />} />
      <Image src={MhBanner} alt="box" h="257px" />
      <VStack
        align="stretch"
        spacing="12px"
        bg="white"
        px="12px"
        pt="24px"
        mt="-24px"
        position="relative"
        zIndex={1}
        borderTopRadius="3xl"
      >
        <Box>
          <Heading size="lg">多维宇宙</Heading>
          <HStack w="118px" h="20px" position="relative" justifyContent="space-between" mt="10px">
            <Image
              position="absolute"
              top="0"
              left="0"
              src={tealBg}
              alt="box"
              h="100%"
              width="100%"
              objectFit="contain"
            />
            <Box color="white" position="relative" zIndex={1} textAlign="center" w="42px">
              限量
            </Box>
            <Box color="white" position="relative" zIndex={1} w="76px" textAlign="center">
              100件
            </Box>
          </HStack>
        </Box>
        <HStack
          h="48px"
          w="100%"
          justifyContent="space-between"
          bg="gray.100"
          pl="12px"
          borderRadius="xl"
          mt="10px"
          onClick={() => router.push('/boxList')}
        >
          <Heading size="md" fontWeight="bold">
            开盒记录
          </Heading>
          <ChevronRight />
        </HStack>
        <Box bg="gray.100" px={4} pb={8} pt="16px" borderRadius="xl">
          <Heading size="md" mb={2}>
            盲盒活动说明
          </Heading>
          <VStack align="stretch" spacing={2} mt="10px">
            <Text fontSize="md" color="gray.600">
              1、新用户专属NFT，7天后可再次领取
            </Text>
            <Text fontSize="md" color="gray.600">
              2、邀请新用户，减少领取倒计时3小时
            </Text>
            <Text fontSize="md" color="gray.600">
              3、累计邀请50位新用户，每小时可再领取1个NFT
            </Text>
            <Text fontSize="md" color="gray.600">
              4、完成邀请任务，最高可领取24个NFT
            </Text>
            <Button
              colorScheme="#0F182C"
              bg="#0F182C"
              color="#fff"
              borderRadius="3xl"
              h="40px"
              mt="20px"
              onClick={() => router.push('/invite')}
            >
              邀请好友
            </Button>
          </VStack>
        </Box>
        <Box bg="gray.100" p={4} borderRadius="xl" px={4} pb={8} pt="16px">
          <Heading size="md" mb={2}>
            当前NFT
          </Heading>
          <VStack align="stretch" spacing={1}>
            <Text fontSize="md" color="gray.600">
              累计邀请：12人
            </Text>
            <Text fontSize="md" color="gray.600">
              已减少：36小时
            </Text>
            <Text fontSize="md" color="gray.600">
              下次领取时间：2024-06-01 12:23:04
            </Text>
            <Button
              colorScheme="#0F182C"
              isDisabled
              bg="#0F182C"
              borderRadius="3xl"
              h="40px"
              mt="20px"
              color="white"
            >
              待领取
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Box>
  )
}

export default BoxPage
