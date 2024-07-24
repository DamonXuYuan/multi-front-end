import React from 'react'
import { Box, VStack, Text, Image, HStack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import Navbar from '@/components/NavBar'
import { CircleX } from 'lucide-react'
import inviteBg from '@/assets/imgs/inviteBg.png'
import downloadIcon from '@/assets/imgs/download.png'
import qrcodeBg from '@/assets/imgs/qrcodeBg.png'
const InvitePage = () => {
  const router = useRouter()
  const handleBack = () => {
    router.back()
  }
  return (
    <Box margin="auto" minHeight="100vh">
      <Navbar
        title=""
        bg="transparent"
        leftContent={<CircleX onClick={handleBack} color="white" />}
        rightContent={<Image src={downloadIcon} w="24px" h="24px" />}
      />
      <Box px="30px">
        <Image
          position="absolute"
          top="0"
          left="0"
          src={inviteBg}
          w="100%"
          h="100%"
          objectFit="fill"
        />
        <VStack
          position="relative"
          zIndex={1}
          fontSize="26px"
          color="white"
          fontWeight="bold"
          mt="22px"
        >
          <Text>邀请好友</Text>
          <Text>加速领取NFT解锁更多好礼</Text>
        </VStack>
        <Box
          borderRadius="3xl"
          position="relative"
          zIndex={1}
          mt="24px"
          w="100%"
          height="265px"
          backgroundImage={qrcodeBg}
          backgroundSize="cover"
          backgroundRepeat="no-repeat"
          backgroundPosition="center"
        >
          <VStack
            align="stretch"
            px="24px"
            py="32px"
            w="100%"
            h="100%"
            justifyContent="space-between"
          >
            <Box>
              <Text fontSize="sm" color="gray.400">
                邀请码
              </Text>
              <HStack justifyContent="space-between" mt="5px">
                <Text color="black" w="70%" fontSize="28px" fontWeight="bold">
                  123456
                </Text>
                <Box
                  border="1px solid #0F182C"
                  lineHeight="30px"
                  borderRadius="3xl"
                  fontSize="sm"
                  w="48px"
                  h="30px"
                  textAlign="center"
                >
                  复制
                </Box>
              </HStack>
            </Box>
            <Box>
              <Text fontSize="sm" color="gray.400">
                邀请连接
              </Text>
              <HStack justifyContent="space-between" mt="5px">
                <Text color="black" w="70%" fontSize="16px" fontWeight="bold">
                  https://12779792470.32344.register.com
                </Text>
                <Box
                  border="1px solid #0F182C"
                  lineHeight="30px"
                  borderRadius="3xl"
                  fontSize="sm"
                  w="48px"
                  h="30px"
                  textAlign="center"
                >
                  复制
                </Box>
              </HStack>
            </Box>
          </VStack>
        </Box>
      </Box>
    </Box>
  )
}

export default InvitePage
