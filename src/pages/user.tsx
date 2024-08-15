import React, { useEffect } from 'react'
import { Box, VStack, Flex, Text, Image, HStack, useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import Navbar from '@/components/NavBar'
import { ChevronLeft } from 'lucide-react'
import { getI18nSSRProps, GetI18nServerSideProps } from '@/utils/i18n'
import { useTranslation } from 'next-i18next'
import inviteBg from '@/assets/imgs/invite_bg.png'
import arrowRight from '@/assets/imgs/arrowRight.png'
import orderImgs from '@/assets/imgs/order.png'
import like from '@/assets/imgs/like.png'
import wbag from '@/assets/imgs/wbag.png'
import logout from '@/assets/imgs/logout.png'
import lgue from '@/assets/imgs/lgue.png'
import safe from '@/assets/imgs/safe.png'
import about from '@/assets/imgs/about.png'
import setting from '@/assets/imgs/setting.png'
import { getLocalStorageObj, removeLocalStorage } from '@/utils/storage'
const BoxListPage = () => {
  const { t } = useTranslation(['user', 'common'])
  const toast = useToast()
  const router = useRouter()
  const [userInfo, setUserInfo] = React.useState<any>({})
  const openAllNFTPage = () => {
    router.push('/allNFT')
  }
  const handleBack = () => {
    router.back()
  }
  const handleNoAction = () => {
    toast({
      title: t('featureInDevelopment'),
      status: 'info',
      isClosable: true,
      duration: 3000,
    })
    return
  }
  const handleLogout = () => {
    removeLocalStorage('userInfo')
    removeLocalStorage('userToken')
    router.replace('/login')
  }
  useEffect(() => {
    const data = getLocalStorageObj('userToken')
    if (!data.token) {
      handleLogout();
    }
    setUserInfo(data.userInfo || {})
  }, [])
  return (
    <Box margin="auto" pt="44px" pb="48px" bg="#FAFAFA" minHeight="100vh">
      <Navbar
        title={t('title') as string}
        isFixed={true}
        leftContent={<ChevronLeft onClick={handleBack} />}
      />
      <VStack align="stretch" spacing="12px" px="12px" pt="12px" position="relative" zIndex={1}>
        <Flex p="12px" flexDirection="row" justifyContent="space-between" alignItems="center">
          <HStack>
            <Image
              src={userInfo.avatar}
              alt={t('user')}
              objectFit="cover"
              width="64px"
              height="64px"
              borderRadius="50%"
            />
            <Box>
              <Text fontSize="16px" color="#0F182C" mb="12px" fontWeight="bold">
                {userInfo.nickname}
              </Text>
              <Text fontSize="12px" color="#C6CDD5">
                {userInfo.add_time}
              </Text>
            </Box>
          </HStack>
          <Image
            src={setting}
            alt={t('blindBox')}
            objectFit="cover"
            width="24px"
            height="24px"
            borderRadius="4px"
          />
        </Flex>
        <Image
          onClick={() => router.push('/inviteList')}
          src={inviteBg}
          alt={t('blindBox')}
          objectFit="cover"
          width="100%"
          height="64px"
          borderRadius="4px"
        />
        <Flex bg="#fff" p="12px" flexDirection="row" alignItems="center">
          <HStack flex="1" onClick={openAllNFTPage}>
            <Image
              src={like}
              alt={t('blindBox')}
              objectFit="cover"
              width="24px"
              height="24px"
              borderRadius="4px"
            />
            <Text fontSize="14px" fontWeight="bold" color="#0F182C">
              {t('myCollections')}
            </Text>
          </HStack>
          <HStack flex="1" onClick={handleNoAction}>
            <Image
              src={wbag}
              alt={t('blindBox')}
              objectFit="cover"
              width="24px"
              height="24px"
              borderRadius="4px"
            />
            <Text fontSize="14px" fontWeight="bold" color="#0F182C">
              {t('myWallet')}
            </Text>
          </HStack>
        </Flex>
        <Flex
          bg="#fff"
          p="12px"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          onClick={handleNoAction}
        >
          <HStack>
            <Image
              src={orderImgs}
              alt={t('blindBox')}
              objectFit="cover"
              width="24px"
              height="24px"
              borderRadius="4px"
            />
            <Text fontSize="14px" color="#0F182C">
              {t('myOrder')}
            </Text>
          </HStack>
          <Image
            src={arrowRight}
            alt={t('blindBox')}
            objectFit="cover"
            width="24px"
            height="24px"
            borderRadius="4px"
          />
        </Flex>
        <Box>
          <Flex
            bg="#fff"
            p="12px"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            onClick={() => {
              router.push('/systemLanguage')
            }}
          >
            <HStack>
              <Image
                src={lgue}
                alt={t('blindBox')}
                objectFit="cover"
                width="24px"
                height="24px"
                borderRadius="4px"
              />
              <Text fontSize="14px" color="#0F182C">
                {t('systemLanguage')}
              </Text>
            </HStack>
            <Image
              src={arrowRight}
              alt={t('blindBox')}
              objectFit="cover"
              width="24px"
              height="24px"
              borderRadius="4px"
            />
          </Flex>
          <Flex
            bg="#fff"
            p="12px"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            onClick={() => router.push('/accountAndSecurity')}
          >
            <HStack>
              <Image
                src={safe}
                alt={t('blindBox')}
                objectFit="cover"
                width="24px"
                height="24px"
                borderRadius="4px"
              />
              <Text fontSize="14px" color="#0F182C">
                {t('accountAndSecurity')}
              </Text>
            </HStack>
            <Image
              src={arrowRight}
              alt={t('blindBox')}
              objectFit="cover"
              width="24px"
              height="24px"
              borderRadius="4px"
            />
          </Flex>
          <Flex
            bg="#fff"
            p="12px"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            onClick={() => {
              router.push('/about')
            }}
          >
            <HStack>
              <Image
                src={about}
                alt={t('blindBox')}
                objectFit="cover"
                width="24px"
                height="24px"
                borderRadius="4px"
              />
              <Text fontSize="14px" color="#0F182C">
                {t('aboutUs')}
              </Text>
            </HStack>
            <Image
              src={arrowRight}
              alt={t('blindBox')}
              objectFit="cover"
              width="24px"
              height="24px"
              borderRadius="4px"
            />
          </Flex>
        </Box>
        <Flex
          bg="#fff"
          p="12px"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          onClick={handleLogout}
        >
          <HStack>
            <Image
              src={logout}
              alt={t('blindBox')}
              objectFit="cover"
              width="24px"
              height="24px"
              borderRadius="4px"
            />
            <Text fontSize="14px" color="#0F182C">
              {t('logout')}
            </Text>
          </HStack>
          <Image
            src={arrowRight}
            alt={t('blindBox')}
            objectFit="cover"
            width="24px"
            height="24px"
            borderRadius="4px"
          />
        </Flex>
      </VStack>
    </Box>
  )
}

export const getServerSideProps = async (ctx: GetI18nServerSideProps) => {
  return {
    props: { ...(await getI18nSSRProps(ctx, ['user'])) },
  }
}

export default BoxListPage
