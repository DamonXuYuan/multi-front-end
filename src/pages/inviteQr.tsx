import React from 'react'
import { Box, VStack, Text, Image, Center } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import Navbar from '@/components/NavBar'
import { CircleX } from 'lucide-react'
import inviteBg from '@/assets/imgs/inviteBg.png'
import dLogo from '@/assets/imgs/dLogo.png'
import { QRCode } from 'react-qrcode-logo'
import { getI18nSSRProps, GetI18nServerSideProps } from '@/utils/i18n'
import { useTranslation } from 'next-i18next'
const InvitePage = () => {
  const { t } = useTranslation(['home'])
  const router = useRouter()
  const { inviteSrc = '' } = router.query
  const handleBack = () => {
    router.back()
  }
  return (
    <Box margin="auto" minHeight="100vh">
      <Navbar
        title=""
        bg="transparent"
        leftContent={<CircleX onClick={handleBack} color="white" />}
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
          <Text fontSize="30px">{t('inviteQrTips1')}</Text>
          <Text fontSize="16px">{t('inviteQrTips2')}</Text>
        </VStack>
        <Box
          position="relative"
          zIndex={1}
          mt="24px"
          w="100%"
          bg="white"
          borderRadius="3xl"
          p="30px"
        >
          <Text textAlign="center" fontSize="18px" fontWeight="bold" mb="24px">
            {t('inviteQrTips3')}
          </Text>
          <Center>
            <QRCode value={inviteSrc as string} />
          </Center>
        </Box>
        <Image mt="30px" position="relative" zIndex={1} w="96px" height="80px" src={dLogo}></Image>
      </Box>
    </Box>
  )
}
export const getServerSideProps = async (ctx: GetI18nServerSideProps) => {
  return {
    props: { ...(await getI18nSSRProps(ctx, ['home'])) },
  }
}
export default InvitePage
