import React, { useEffect, useState } from 'react'
import { Box, VStack, Grid, GridItem, Text, Image, Center, Spinner } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import Navbar from '@/components/NavBar'
import { ChevronLeft } from 'lucide-react'
import { getI18nSSRProps, GetI18nServerSideProps } from '@/utils/i18n'
import { useTranslation } from 'next-i18next'
import useSWR from 'swr'
import { boxGetMyList } from '@/api/box'

interface Box {
  picture: string
  title: string
}
interface BoxItem {
  id: number
  box: Box
  price: number
}
const BoxListPage = () => {
  const { t } = useTranslation(['box'])
  const router = useRouter()
  const [boxList, setBoxList] = useState<BoxItem[]>([])
  const handleBack = () => {
    router.back()
  }
  const { data: boxData } = useSWR(boxGetMyList.key, () =>
    boxGetMyList.fetcher({ page: 1, limit: 20 })
  )
  useEffect(() => {
    if (boxData && boxData.code === 200) {
      console.log(boxData)
      setBoxList(boxData.data?.list || [])
    }
  }, [boxData])
  return (
    <Box margin="auto" pt="44px" pb="48px" bg="#FAFAFA" minHeight="100vh">
      <Navbar
        title={t('allNFTTitle') as string}
        isFixed={true}
        leftContent={<ChevronLeft onClick={handleBack} />}
      />
      {!boxData ? (
        <Center h="100vh">
          <Spinner size="sm" />
        </Center>
      ) : (
        <VStack align="stretch" spacing="12px" px="12px" pt="12px" position="relative" zIndex={1}>
          <Grid templateColumns="repeat(2, 1fr)" gap={4}>
            {boxList.map((nft, index) => (
              <GridItem key={index} backgroundColor="#fff" borderRadius="lg" overflow="hidden">
                <Image w={169} h={116} src={nft.box.picture} alt={nft.box.title} />
                <Box p={4}>
                  <Text fontWeight="bold">{nft.box.title}</Text>
                  <Text fontWeight="bold" color="green.500">
                    {nft.price}
                  </Text>
                </Box>
              </GridItem>
            ))}
          </Grid>
        </VStack>
      )}
      {!boxData && boxList.length === 0 ? (
        <Center h="100vh">
          <Text color="#C6CDD5" fontSize="20px">
            {t('noData')}
          </Text>
        </Center>
      ) : null}
    </Box>
  )
}
export const getServerSideProps = async (ctx: GetI18nServerSideProps) => {
  return {
    props: { ...(await getI18nSSRProps(ctx, ['box'])) },
  }
}
export default BoxListPage
