import React from 'react'
import { Box, Text, Heading, Stack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import Navbar from '@/components/NavBar'
import { ChevronLeft } from 'lucide-react'
import { getI18nSSRProps, GetI18nServerSideProps } from '@/utils/i18n'
import { useTranslation } from 'next-i18next'

const BoxPage = () => {
  const { t } = useTranslation(['home'])
  const router = useRouter()
  const handleBack = () => {
    router.back()
  }
  return (
    <Box margin="auto" pt="44px" pb="48px" bg="white" minHeight="100vh">
      <Navbar
        title={t('ruleTitle')}
        isFixed={true}
        leftContent={<ChevronLeft onClick={handleBack} />}
      />
      <Stack p="12px">
        <Heading size="md">{t('rule1Title')}</Heading>
        <Text>{t('rule1')}</Text>
        <Heading size="md">{t('rule2Title')}</Heading>
        <Text>{t('rule2.1')}</Text>
        <Text>{t('rule2.2')}</Text>
        <Text>{t('rule2.3')}</Text>
        <Heading size="md">{t('rule3Title')}</Heading>
        <Text>{t('rule3')}</Text>
      </Stack>
    </Box>
  )
}

export const getServerSideProps = async (ctx: GetI18nServerSideProps) => {
  return {
    props: { ...(await getI18nSSRProps(ctx, ['home'])) },
  }
}

export default BoxPage
