import React, { useEffect, useState } from 'react'
import { Box, VStack, Text, Image, HStack, Button, Stack, Heading } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import Navbar from '@/components/NavBar'
import { ChevronLeft } from 'lucide-react'
import { getI18nSSRProps, GetI18nServerSideProps } from '@/utils/i18n'
import { useTranslation } from 'next-i18next'
import inviteBg from '@/assets/imgs/inviteBg.png'
import share from '@/assets/imgs/share.png'
import useSWR from 'swr'
import { inviterelate } from '@/api/user'
interface InviteItem {
  id: number
  title: string
}
const InviteListPage = () => {
  const { t } = useTranslation(['home'])
  const [inviteList, setInviteList] = useState<InviteItem[]>([])
  const [inviteCode, setInviteCode] = useState('')
  const [inviteSrc, setInviteSrc] = useState('')
  const router = useRouter()
  const handleBack = () => {
    router.back()
  }
  const { data: inviteData } = useSWR(
    inviterelate.key,
    () => inviterelate.fetcher(),
    { revalidateOnFocus: false }
  )
  useEffect(() => {
    if (inviteData && inviteData.code === 200) {
      setInviteList(inviteData.data?.my_invited_users || [])
      setInviteCode(inviteData.data?.user_code || '')
      setInviteSrc(inviteData.data?.invited_link || '')
    }
  }, [inviteData])
  return (
    <Box margin="auto" minHeight="100vh">
      <Navbar
        title={t('inviteListTitle') as string}
        titleColor="white"
        bg="transparent"
        leftContent={<ChevronLeft onClick={handleBack} color="white" />}
        rightContent={
          <Image
            src={share}
            w="24px"
            h="24px"
            onClick={() =>
              router.push({
                pathname: '/inviteQr',
                query: { inviteSrc },
              })
            }
          />
        }
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
          <Text fontSize="28px">{t('inviteListTitle')}</Text>
          <Text fontSize="28px">{t('inviteListTips')}</Text>
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
              {t('myInvitations', { count: inviteList.length })}
            </Text>
          </HStack>
          {inviteList.map((item: any) => (
            <Stack spacing="20px" mt="10px" key={item.id}>
              <HStack>
                <Image borderRadius="40px" w="40px" h="40px" src={inviteBg} />
                <Box>
                  <Heading size="xs" textTransform="uppercase">
                    {item.email}
                  </Heading>
                  <Text pt="2" fontSize="sm" color="gray.500">
                    {item.time}
                  </Text>
                </Box>
              </HStack>
            </Stack>
          ))}
        </Box>
        <Button
          colorScheme="#51CEAA"
          bg="#51CEAA"
          color="#fff"
          borderRadius="3xl"
          w="100%"
          h="40px"
          mt="24px"
          onClick={() =>
            router.push({
              pathname: '/invite',
              query: { inviteCode, inviteSrc },
            })
          }
        >
          {t('inviteFriend')}
        </Button>
      </Box>
    </Box>
  )
}
export const getServerSideProps = async (ctx: GetI18nServerSideProps) => {
  return {
    props: { ...(await getI18nSSRProps(ctx, ['home'])) },
  }
}
export default InviteListPage
