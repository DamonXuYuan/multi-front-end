import React from 'react'
import { Flex } from '@chakra-ui/react'
import { getI18nSSRProps, GetI18nServerSideProps } from '@/utils/i18n'
import RaffleCard, { RaffleCardProps } from '@/components/raffleCard'
import raffleImg from '@/assets/imgs/raffleImg.jpg'
import { useRouter } from 'next/router'
import { setLocalStorage } from '@/utils/storage'

function Raffle() {
  const router = useRouter()
  const list = [
    {
      img: raffleImg,
      name: '小星球NFT',
      range: '星球系列',
      price: '400',
      unit: '$',
      time: '20:00',
      type: '进行中',
    },
    {
      img: raffleImg,
      name: '小星球NFT2',
      range: '星球系列',
      price: 500,
      time: '20:00',
      type: '进行中',
    },
  ]
  return (
    <Flex flexDir="column" margin=" 0 auto" px="12px">
      {list.map((item: RaffleCardProps, index: number) => (
        <RaffleCard
          mb="16px"
          key={index}
          raffleCard={item}
          onClick={() => {
            setLocalStorage('pageTitle', item.name)
            router.push('/raffleDetail')
          }}
        />
      ))}
    </Flex>
  )
}

export const getServerSideProps = async (ctx: GetI18nServerSideProps) => {
  return {
    props: { ...(await getI18nSSRProps(ctx, ['raffle', 'home'])) },
  }
}

export default Raffle
