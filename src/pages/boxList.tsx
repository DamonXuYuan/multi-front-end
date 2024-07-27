import React from 'react'
import { Box, VStack, Flex, Text, Image } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import Navbar from '@/components/NavBar'
import { ChevronLeft } from 'lucide-react'
import { getI18nSSRProps, GetI18nServerSideProps } from '@/utils/i18n'
import { useTranslation } from 'next-i18next'
// import useSWR from 'swr'
// import { boxInfo } from '@/api/box'
import MhBanner from '@/assets/imgs/mhBanner.png'

const BoxListPage = () => {
  const { t } = useTranslation(['home'])
  const router = useRouter()
  const handleBack = () => {
    router.back()
  }
  return (
    <Box margin="auto" pt="44px" pb="48px" bg="#FAFAFA" minHeight="100vh">
      <Navbar title={t("boxListPageTitle") as string} isFixed={true} leftContent={<ChevronLeft onClick={handleBack} />} />
      <VStack
        align="stretch"
        spacing="12px"
        px="12px"
        pt="12px"
        position="relative"
        zIndex={1}
      >
        <Flex bg="#fff" p="12px" flexDirection="row" justifyContent="space-between" alignItems="center">
          <Box>
            <Text fontSize="16px" color="#0F182C" mb="12px" fontWeight="bold">开启时间</Text>
            <Text fontSize="12px" color="#C6CDD5">2024-06-01 12:23:02</Text>
          </Box>
          <Image src={MhBanner} alt="Blind Box" objectFit="cover" width="48px" height="48px" borderRadius="4px" />
        </Flex>
        <Flex bg="#fff" p="12px" flexDirection="row" justifyContent="space-between" alignItems="center">
          <Box>
            <Text fontSize="16px" color="#0F182C" mb="12px" fontWeight="bold">开启时间</Text>
            <Text fontSize="12px" color="#C6CDD5">2024-06-01 12:23:02</Text>
          </Box>
          <Image src={MhBanner} alt="Blind Box" objectFit="cover" width="48px" height="48px" borderRadius="4px" />
        </Flex>
      </VStack>
    </Box>
  )
}
export const getServerSideProps = async (ctx: GetI18nServerSideProps) => {
  return {
    props: { ...(await getI18nSSRProps(ctx, ['home'])) },
  }
}
export default BoxListPage
