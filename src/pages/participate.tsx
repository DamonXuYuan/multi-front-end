import React from 'react'
import { Flex, Text, Image, Grid } from '@chakra-ui/react'
import { getI18nSSRProps, GetI18nServerSideProps } from '@/utils/i18n'
import { useTranslation } from 'next-i18next'
import raffleImg from '@/assets/imgs/raffleImg.jpg'

function Participate() {
  const { t } = useTranslation(['raffle'])
  const list = [
    raffleImg,
    raffleImg,
    raffleImg,
    raffleImg,
    raffleImg,
    raffleImg,
    raffleImg,
    raffleImg,
    raffleImg,
  ]

  return (
    <Flex flexDir="column" p="16px 12px" boxSizing="border-box">
      <Flex
        flexDir="column"
        p="16px 12px"
        boxSizing="border-box"
        bgColor="gray.400"
        borderRadius="8px"
        mb="24px"
      >
        <Flex fontSize="16px" lineHeight="1" fontWeight="600" color="black.200" mb="8px">
          <Text>{t('probability') as string}</Text>
          <Text color="green.100">12.33%</Text>
        </Flex>
        <Flex fontSize="12px" lineHeight="1" fontWeight="600" color="black.200">
          <Text>{t('probabilityDes') as string}</Text>
          <Text color="green.100">{t('inviteFriendText') as string}</Text>
        </Flex>
      </Flex>
      <Grid templateColumns="repeat(4, 1fr)" gap="32px">
        {list.map((item: string, index: number) => (
          <Image key={index} src={item} w="64px" h="64px" borderRadius="50%" overflow="hidden" />
        ))}
      </Grid>
    </Flex>
  )
}

export const getServerSideProps = async (ctx: GetI18nServerSideProps) => {
  return {
    props: { ...(await getI18nSSRProps(ctx, ['raffle'])) },
  }
}
export default Participate
