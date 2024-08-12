import React, { useEffect, useState } from 'react'
import { Flex } from '@chakra-ui/react'
import { getI18nSSRProps, GetI18nServerSideProps } from '@/utils/i18n'
import RaffleCard, { RaffleCardProps } from '@/components/raffleCard'
import { useRouter } from 'next/router'
import { setLocalStorage } from '@/utils/storage'
import useSWR from 'swr'
import { getRaffleList } from '@/api/raffle'

function Raffle() {
  const router = useRouter()
  const [nftList, setNftList] = useState([])
  const { data: getRaffleListData } = useSWR(
    [getRaffleList.key],
    () =>
      getRaffleList.fetcher({
        page: 1,
        limit: 10,
      }),
    { revalidateOnFocus: false }
  )

  useEffect(() => {
    if (!getRaffleListData || getRaffleListData?.code !== 200) return
    const list = getRaffleListData?.data?.list
    console.log(list, 'list')
    const newList = list.map((item: any) => {
      return {
        ...item,
        img: item?.show_src,
        range: item?.title,
        time: '20:00',
        type: '进行中',
      }
    })
    setNftList(newList)
  }, [getRaffleListData])

  return (
    <Flex flexDir="column" margin=" 0 auto" px="12px">
      {nftList.map((item: RaffleCardProps, index: number) => (
        <RaffleCard
          mb="16px"
          key={index}
          raffleCard={item}
          onClick={() => {
            setLocalStorage('pageTitle', item.name)
            router.push(`/raffleDetail?id=${item?.id}`)
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
