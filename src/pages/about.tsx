import React from 'react'
import { Box, VStack, Image, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import Navbar from '@/components/NavBar'
import { ChevronLeft } from 'lucide-react'
import { getI18nSSRProps, GetI18nServerSideProps } from '@/utils/i18n'
import { useTranslation } from 'next-i18next'
import aboutLogo from '@/assets/imgs/aboutLogo.png'

const IndexPage = () => {
  const { t } = useTranslation(['user'])
  const router = useRouter()
  const handleBack = () => {
    router.back()
  }

  return (
    <Box margin="auto" pt="44px" pb="48px" bg="#fff" minHeight="100vh">
      <Navbar
        title={t('aboutUs') as string}
        isFixed={true}
        leftContent={<ChevronLeft onClick={handleBack} />}
      />
      <VStack spacing={4} p={8}>
        <Image
          boxSize="80px"
          src={aboutLogo} // 替换为实际的图片路径
          alt="Logo"
          mb={4}
        />
        <Text fontSize="xl" fontWeight="bold">
          MULTI 1.0.0
        </Text>
        <Text fontSize="lg" color="gray.600" textIndent="20px">
          {t('aboutUsContent1')}
        </Text>
        <Text fontSize="lg" color="gray.600" textIndent="20px">
          {t('aboutUsContent2')}
        </Text>
      </VStack>
    </Box>
  )
}
export const getServerSideProps = async (ctx: GetI18nServerSideProps) => {
  return {
    props: { ...(await getI18nSSRProps(ctx, ['user'])) },
  }
}
export default IndexPage
