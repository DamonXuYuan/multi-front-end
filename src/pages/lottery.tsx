import React from 'react'
import { Flex, Image, Text } from '@chakra-ui/react'
import { getI18nSSRProps, GetI18nServerSideProps } from '@/utils/i18n'
import { useTranslation } from 'next-i18next'
import cassetteNFT from '@/assets/imgs/cassetteNFT.png'
import BaseButton from '@/components/BaseButton'

function Lottery() {
  const { t } = useTranslation(['raffle'])
  return (
    <Flex flexDir="column" alignItems="center" p="32px">
      <Text color="black.200" fontSize="28px" lineHeight="1" fontWeight="600" mb="48px">
        {t('winTitle') as string}
      </Text>
      <Image w="204px" h="166px" mb="40px" src={cassetteNFT} />
      <BaseButton>{t('viewRewards') as string}</BaseButton>
    </Flex>
  )
}

export const getServerSideProps = async (ctx: GetI18nServerSideProps) => {
  return {
    props: { ...(await getI18nSSRProps(ctx, ['raffle'])) },
  }
}
export default Lottery
