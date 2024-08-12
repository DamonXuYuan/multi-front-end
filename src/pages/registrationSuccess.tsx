import React from 'react'
import { Box, Flex, Image, Text } from '@chakra-ui/react'
import { getI18nSSRProps, GetI18nServerSideProps } from '@/utils/i18n'
import { useTranslation } from 'next-i18next'
import cassetteNFT from '@/assets/imgs/cassetteNFT.png'
import BaseButton from '@/components/BaseButton'
import { useRouter } from 'next/router'

function RegistrationSuccess() {
  const router = useRouter()
  const { t } = useTranslation(['home'])

  return (
    <Flex flexDir="column" alignItems="center" p="32px">
      <Text fontWeight="600" fontSize="28px" lineHeight="1" mb="48px">
        {t('registrationSuccessTitle') as string}
      </Text>
      <Image w="204px" h="166px" mb="32px" src={cassetteNFT} />
      <Box
        w="214px"
        textAlign="center"
        fontWeight="400"
        fontSize="16px"
        lineHeight="32px"
        mb="32px"
      >
        <Text as="span">{t('registrationSuccessTips1') as string}</Text>
        <Text as="span" color="green.100">
          {t('registrationSuccessTips2') as string}
        </Text>
      </Box>
      <BaseButton onClick={() => router.push('/home')}>
        {t('registrationSuccessButton') as string}
      </BaseButton>
    </Flex>
  )
}

export const getServerSideProps = async (ctx: GetI18nServerSideProps) => {
  return {
    props: { ...(await getI18nSSRProps(ctx, ['home'])) },
  }
}
export default RegistrationSuccess
