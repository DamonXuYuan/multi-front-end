import React, { useEffect, useState } from 'react'
import { Box, VStack, Flex, Text, Image, Center, Spinner } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import Navbar from '@/components/NavBar'
import { ChevronLeft } from 'lucide-react'
import { getI18nSSRProps, GetI18nServerSideProps } from '@/utils/i18n'
import { useTranslation } from 'next-i18next'
import useSWR from 'swr'
import { boxGetMyList } from '@/api/box'

interface Box {
  picture: string
  title: number
}
interface BoxItem {
  id: number
  cover: Box
  add_time: string
}
const BoxListPage = () => {
  const { t } = useTranslation(['box'])
  const router = useRouter()
  const [boxList, setBoxList] = useState<BoxItem[]>([])
  const handleBack = () => {
    router.back()
  }
  const { data: boxData } = useSWR(
    boxGetMyList.key,
    () => boxGetMyList.fetcher({ page: 1, limit: 20, type: 7 }),
    {
      revalidateOnFocus: false,
    }
  )
  useEffect(() => {
    if (boxData && boxData.code === 200) {
      setBoxList(boxData.data?.list || [])
    }
  }, [boxData])
  return (
    <Box margin="auto" pt="44px" pb="48px" bg="#FAFAFA" minHeight="100vh">
      <Navbar
        title={t('boxListTitle') as string}
        isFixed={true}
        leftContent={<ChevronLeft onClick={handleBack} />}
      />
      {!boxData ? (
        <Center h="100vh">
          <Spinner size="sm" />
        </Center>
      ) : (
        <VStack align="stretch" spacing="12px" px="12px" pt="12px" position="relative" zIndex={1}>
          {boxList.map((item: any) => (
            <Flex
              bg="#fff"
              p="12px"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              key={item.id}
            >
              <Box>
                <Text fontSize="16px" color="#0F182C" mb="12px" fontWeight="bold">
                  {item.box.title}
                </Text>
                <Text fontSize="12px" color="#C6CDD5">
                  {item.add_time}
                </Text>
              </Box>
              <Image
                src={item.box.picture}
                alt="Blind Box"
                objectFit="cover"
                width="48px"
                height="48px"
                borderRadius="4px"
              />
            </Flex>
          ))}
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
