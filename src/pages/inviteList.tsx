import React from 'react'
import { Box, VStack, Text, Image, HStack, Button, Stack, Heading } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import Navbar from '@/components/NavBar'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import inviteBg from '@/assets/imgs/inviteBg.png'
import share from '@/assets/imgs/share.png'
const InviteListPage = () => {
  const router = useRouter()
  const handleBack = () => {
    router.back()
  }
  const handleInvite = () => {
    console.log('invite')
  }
  return (
    <Box margin="auto" minHeight="100vh">
      <Navbar
        title="邀请好友"
        titleColor="white"
        bg="transparent"
        leftContent={<ChevronLeft onClick={handleBack} color="white" />}
        rightContent={<Image src={share} w="24px" h="24px" />}
      />
      <Image
        position="absolute"
        top="0"
        left="0"
        src={inviteBg}
        w="100%"
        h="100%"
        objectFit="fill"
      />
      <Box px="30" display="flex" flexDirection="column" alignItems="center">
        <VStack position="relative" zIndex={1} color="white" fontWeight="bold" mt="22px">
          <Text fontSize="28px">邀请好友</Text>
          <Text fontSize="28px">赢取NFT奖励</Text>
        </VStack>
        <Box
          position="relative"
          zIndex={1}
          mt="24px"
          w="100%"
          bg="white"
          borderRadius="3xl"
          p="12px"
          h="400px"
        >
          <HStack justifyContent="space-between">
            <Text fontSize="16px" fontWeight="bold">
              我的邀请（24人）
            </Text>
            <ChevronRight onClick={handleInvite} />
          </HStack>
          <Stack spacing="20px" mt="10px">
            <HStack>
              <Image borderRadius="40px" w="40px" h="40px" src={inviteBg} />
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Summary
                </Heading>
                <Text pt="2" fontSize="sm" color="gray.500">
                  View a summary of all your clients over the last month.
                </Text>
              </Box>
            </HStack>
            <HStack>
              <Image borderRadius="40px" w="40px" h="40px" src={inviteBg} />
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Summary
                </Heading>
                <Text pt="2" fontSize="sm" color="gray.500">
                  View a summary of all your clients over the last month.
                </Text>
              </Box>
            </HStack>
          </Stack>
        </Box>
        <Button
          colorScheme="#51CEAA"
          bg="#51CEAA"
          color="#fff"
          borderRadius="3xl"
          w="100%"
          h="40px"
          mt="24px"
        >
          邀请好友
        </Button>
      </Box>
    </Box>
  )
}

export default InviteListPage
