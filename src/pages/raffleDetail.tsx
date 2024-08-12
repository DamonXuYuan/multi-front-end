import React, { useEffect, useState } from 'react'
import { Flex, Image, Text } from '@chakra-ui/react'
import { getI18nSSRProps, GetI18nServerSideProps } from '@/utils/i18n'
import BaseButton from '@/components/BaseButton'
import { useTranslation } from 'next-i18next'
import raffleImg from '@/assets/imgs/raffleImg.jpg'
import rightIcon from '@/assets/imgs/rightIcon.png'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { getRaffleDetail } from '@/api/raffle'

function Raffle() {
  const { t } = useTranslation(['raffle'])
  const router = useRouter()
  const id = router?.query?.id
  const [type] = useState(2) // 1：未参加；2：等待开奖；3：中奖；4：未中奖
  const card = {
    img: raffleImg,
    name: '小星球NFT',
    range: '星球系列',
    price: '400',
    unit: '$',
    time: '20:00',
    type: '进行中',
  }
  const { data: getRaffleDetailData } = useSWR(
    id ? [getRaffleDetail.key, id] : null,
    () =>
      getRaffleDetail.fetcher({
        id: id,
      }),
    { revalidateOnFocus: false }
  )

  useEffect(() => {
    console.log(getRaffleDetailData, 99999)
  }, [getRaffleDetailData])

  const Type1 = () => (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      pos="fixed"
      bottom="0"
      left="0"
      w="full"
      h="80px"
      p="0 12px"
      boxSizing="border-box"
      bgColor="white.100"
      boxShadow="0px -1px 6px 1px rgba(15,47,38,0.05)"
      zIndex="99"
    >
      <Text fontSize="24px" color="black.200" fontWeight="600">
        {card?.unit ?? '$'}
        {card.price}
      </Text>
      <BaseButton
        w="200px"
        borderRadius="28px"
        bgColor="green.100"
        color="white.100"
        fontSize="16px"
        fontWeight="600"
      >
        {t('payButton') as string}
      </BaseButton>
    </Flex>
  )

  const Type2 = () => (
    <Flex flexDir="column" mt="30px">
      <BaseButton
        borderRadius="28px"
        bgColor="black.200"
        color="white.100"
        fontSize="16px"
        fontWeight="600"
        mb="16px"
      >
        {`${t('waitButton')}12.33%)`}
      </BaseButton>
      <BaseButton
        borderRadius="28px"
        border="1px solid"
        borderColor="black.200"
        bgColor="transparent"
        color="black.200"
        fontSize="16px"
        fontWeight="600"
      >
        {t('inviteFriends') as string}
      </BaseButton>
    </Flex>
  )

  const Type3 = () => (
    <Flex flexDir="column" mt="30px">
      <BaseButton
        borderRadius="28px"
        bgColor="green.100"
        color="white.100"
        fontSize="16px"
        fontWeight="600"
        mb="16px"
        onClick={() => router.push('/lottery')}
      >
        {t('winButton') as string}
      </BaseButton>
    </Flex>
  )

  const Type4 = () => (
    <Flex flexDir="column" mt="30px">
      <BaseButton
        borderRadius="28px"
        bgColor="gray.300"
        color="white.100"
        fontSize="16px"
        fontWeight="600"
        mb="16px"
      >
        {t('loseButton') as string}
      </BaseButton>
    </Flex>
  )

  return (
    <Flex flexDir="column" pos="relative">
      <Image alt="photo" w="full" h="250px" src={card.img} />
      <Flex
        pos="absolute"
        top="227px"
        left="0"
        w="full"
        flexDir="column"
        borderTopRadius="16px"
        p="24px 12px"
        boxSizing="border-box"
        zIndex="1"
        bgColor="white.100"
      >
        {/* header */}
        <Flex justifyContent="space-between" mb="24px">
          {/* Left */}
          <Flex flexDir="column" justifyContent="space-between">
            <Text color="black.200" fontSize="20px" lineHeight="1" fontWeight="600" mb="8px">
              {card.name}
            </Text>
            <Text color="gray.300" fontSize="14px" lineHeight="1" fontWeight="400">
              {card.range}
            </Text>
          </Flex>
          <Flex flexDir="column" justifyContent="center">
            <BaseButton
              w="97px"
              h="30px"
              bgColor={type === 1 || type === 2 ? 'green.100' : 'gray.300'}
            >
              <Text zIndex="1" color="white.100" fontSize="12px">
                {card?.time && `${card?.time} | `}
                {card?.type}
              </Text>
            </BaseButton>
          </Flex>
        </Flex>
        {/* 参与人数 */}
        <Flex
          w="full"
          p="13px 12px"
          borderRadius="8px"
          boxSizing="border-box"
          bgColor="gray.400"
          justifyContent="space-between"
          color="black.200"
          fontSize="16px"
          fontWeight="400"
          mb="12px"
          onClick={() => router.push('/participate')}
        >
          <Text fontWeight="600">{t('NumberOfParticipants') as string}</Text>
          <Flex>
            <Text>10人</Text>
            <Image w="24px" h="24px" src={rightIcon} />
          </Flex>
        </Flex>
        {/* 说明 */}
        <Flex
          flexDir="column"
          w="full"
          p="16px 12px 24px"
          borderRadius="8px"
          boxSizing="border-box"
          bgColor="gray.400"
          justifyContent="space-between"
          color="black.200"
          fontSize="14px"
          fontWeight="400"
          lineHeight="32px"
          mb="12px"
        >
          <Text fontSize="16px" fontWeight="600" lineHeight="1" mb="16px">
            {t('clarification') as string}
          </Text>
          <Text>{t('clarificationContent1') as string}</Text>
          <Text>{t('clarificationContent2') as string}</Text>
          <Text>{t('clarificationContent3') as string}</Text>
        </Flex>
        {type === 1 ? <Type1 /> : type === 2 ? <Type2 /> : type === 3 ? <Type3 /> : <Type4 />}
      </Flex>
    </Flex>
  )
}

export const getServerSideProps = async (ctx: GetI18nServerSideProps) => {
  return {
    props: { ...(await getI18nSSRProps(ctx, ['raffle', 'home'])) },
  }
}

export default Raffle
