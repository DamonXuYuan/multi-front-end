import React, { useEffect, useState } from 'react'
import { Box, VStack, Heading, Text, Button, Image, HStack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import Navbar from '@/components/NavBar'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import useSWR, { mutate } from 'swr'
import { getI18nSSRProps, GetI18nServerSideProps } from '@/utils/i18n'
import { useTranslation } from 'next-i18next'
import { inviteinfo, receive } from '@/api/box'
import MhBanner from '@/assets/imgs/mhBanner.png'
import tealBg from '@/assets/imgs/tealBg.png'


const BoxPage = () => {
  const { t } = useTranslation(['box'])
  const router = useRouter()
  const handleBack = () => {
    router.back()
  }
  const [boxData, setBoxData] = useState<any>({})
  const { id } = router.query
  const { data: inviteinfoData } = useSWR(id ? inviteinfo.key : null, () => inviteinfo.fetcher({ id }), {
    revalidateOnFocus: false,
  })
  useSWR(boxData.if_can_receive ?  receive.key : null, receive.fetcher)
  const handleReceive = () => {
    if (boxData.if_can_receive) {
      mutate(receive.key)
    }
  }
  useEffect(() => {
    if (inviteinfoData && inviteinfoData.code === 200) {
      setBoxData(inviteinfoData.data)
    }
  }, [inviteinfoData])
  return (
    <Box margin="auto" pt="44px" pb="48px" bg="white" minHeight="100vh">
      <Navbar title={t('title')} isFixed={true} leftContent={<ChevronLeft onClick={handleBack} />} />
      <Image src={MhBanner} alt="box" h="257px" onClick={() => router.push('/inviteList')}/>
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
          <Heading size="lg">{t('title')}</Heading>
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
              {t('limited')}
            </Box>
            <Box color="white" position="relative" zIndex={1} w="76px" textAlign="center">
              {t('items')}
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
            {t('boxRecord')}
          </Heading>
          <ChevronRight />
        </HStack>
        <Box bg="gray.100" px={4} pb={8} pt="16px" borderRadius="xl">
          <Heading size="md" mb={2}>
            {t('blindBoxDescription')}
          </Heading>
          <VStack align="stretch" spacing={2} mt="10px">
            <Text fontSize="md" color="gray.600">
              {t('newUserNFT')}
            </Text>
            <Text fontSize="md" color="gray.600">
              {t('inviteNewUser')}
            </Text>
            <Text fontSize="md" color="gray.600">
              {t('cumulativeInvite')}
            </Text>
            <Text fontSize="md" color="gray.600">
              {t('completeInviteTask')}
            </Text>
            <Button
              colorScheme="#0F182C"
              bg="#0F182C"
              color="#fff"
              borderRadius="3xl"
              h="40px"
              mt="20px"
              onClick={() => router.push('/inviteList')}
            >
              {t('inviteFriends')}
            </Button>
          </VStack>
        </Box>
        <Box bg="gray.100" p={4} borderRadius="xl" px={4} pb={8} pt="16px">
          <Heading size="md" mb={2}>
            {t('currentNFT')}
          </Heading>
          <VStack align="stretch" spacing={1}>
            <Text fontSize="md" color="gray.600">
              {t('totalInvites', { count: boxData.invited_user_nums })}
            </Text>
            <Text fontSize="md" color="gray.600">
              {t('reducedHours', { count: boxData.has_decreased_time })}
            </Text>
            <Text fontSize="md" color="gray.600">
              {t('nextClaimTime', { time: boxData.next_receive_time })}
            </Text>
            <Button
              onClick={handleReceive}
              colorScheme="#0F182C"
              isDisabled={!boxData.if_can_receive}
              bg="#0F182C"
              borderRadius="3xl"
              h="40px"
              mt="20px"
              color="white"
            >
              {t('pendingClaim')}
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Box>
  )
}

export const getServerSideProps = async (ctx: GetI18nServerSideProps) => {
  return {
    props: { ...(await getI18nSSRProps(ctx, ['box'])) },
  }
}
export default BoxPage