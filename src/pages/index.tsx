import React, { useEffect, useState } from 'react'
import {
  Box,
  VStack,
  Text,
  Image,
  Flex,
  Center,
  Spinner,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  ModalCloseButton,
  ModalHeader,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import Navbar from '@/components/NavBar'
import TabBar from '@/components/TabBar'
import MhBanner from '@/assets/imgs/mhBanner.png'
import notice from '@/assets/imgs/notice.png'
import useSWR from 'swr'
import { boxGetList } from '@/api/box'
import { afficheGetNew } from '@/api/affiche'
import { getI18nSSRProps, GetI18nServerSideProps } from '@/utils/i18n'
import { useTranslation } from 'next-i18next'
import DOMPurify from 'dompurify'
interface Cover {
  show_src: string
  height: number
}
interface BoxItem {
  id: number
  title: string
  cover: Cover
}

function App() {
  const [afficheTitle, setAfficheTitle] = useState('')
  const [boxList, setBoxList] = useState<BoxItem[]>([])
  const [content, setContent] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const { t } = useTranslation(['home'])
  const goBoxPage = (id: number) => {
    router.push({
      pathname: '/box',
      query: { id },
    })
  }
  const goInvitePage = () => {
    router.push('/inviteList')
  }
  const handleNotice = () => {
    setIsOpen(true)
  }
  const onClose = () => setIsOpen(false)
  const { data: afficheData } = useSWR(afficheGetNew.key, () => afficheGetNew.fetcher(), {
    revalidateOnFocus: false,
  })
  const { data: boxData } = useSWR(boxGetList.key, () => boxGetList.fetcher(), {
    revalidateOnFocus: false,
  })
  useEffect(() => {
    if (afficheData && afficheData.code === 200) {
      setAfficheTitle(afficheData.data.title)
      setContent(DOMPurify.sanitize(afficheData.data.content))
    }
    if (boxData && boxData.code === 200) {
      setBoxList(boxData.data?.list || [])
    }
  }, [afficheData, boxData])
  return (
    <Box margin="auto" pt="44px" pb="48px" bg="gray.50" minHeight="100vh">
      <Navbar title={t('title')} isFixed={true} />
      {!afficheData || !boxData ? (
        <Center h="100vh">
          <Spinner size="sm" />
        </Center>
      ) : (
        <VStack align="stretch" px={4} mt={4}>
          <Box
            bg="gray.800"
            borderRadius="lg"
            color="white"
            position="relative"
            overflow="hidden"
            onClick={goInvitePage}
          >
            <Image src={MhBanner} alt="Blind Box" objectFit="contain" width="100%" height="175px" />
          </Box>
          <Flex
            align="center"
            bg="white"
            p={3}
            borderRadius="3xl"
            boxShadow="sm"
            mt={5}
            mb={8}
            onClick={handleNotice}
          >
            <Image src={notice} w="20px" h="20px" mr="5px"></Image>
            <Text color="gray.500">{afficheTitle}</Text>
          </Flex>
          <Box mb={4}>
            <Text color="black" fontSize="lg" fontWeight="bold" mb={2}>
              {t('BoxNFT')}
            </Text>
            {boxList.map((item, index) => {
              return (
                <Box
                  key={index}
                  bg="white"
                  borderRadius="xl"
                  overflow="hidden"
                  onClick={() => {
                    goBoxPage(item.id)
                  }}
                >
                  <Image
                    src={item?.cover?.show_src}
                    objectFit="cover"
                    width="100%"
                    height={item.cover.height}
                  />
                  <Text color="black" fontSize="lg" fontWeight="bold" py={5} px={3}>
                    {item.title}
                  </Text>
                </Box>
              )
            })}
          </Box>
        </VStack>
      )}
      <TabBar />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="#fff">
          <ModalHeader textAlign="center">{afficheTitle}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box
              maxHeight="70vh"
              overflowY="auto"
              padding="4"
              borderRadius="md"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export const getServerSideProps = async (ctx: GetI18nServerSideProps) => {
  return {
    props: { ...(await getI18nSSRProps(ctx, ['home'])) },
  }
}
export default App
