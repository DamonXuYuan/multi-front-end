import React, { useEffect, useState } from 'react'
import { Flex, Image, Text, useBoolean, useToast } from '@chakra-ui/react'
import { getI18nSSRProps, GetI18nServerSideProps } from '@/utils/i18n'
import miniLogo from '@/assets/imgs/miniLogo.png'
import { useTranslation } from 'next-i18next'
import BaseInput from '@/components/BaseInput'
import BaseButton from '@/components/BaseButton'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { userLogin } from '@/api/login'
import { setLocalStorage } from '@/utils/storage'
import { FailToast } from '@/components/BaseToast'

function Login() {
  const router = useRouter()
  const toast = useToast()
  const { t } = useTranslation(['home'])
  const [userName, setUserName] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [loginClick, setLoginClick] = useBoolean(false)

  const { data: userLoginData, isLoading: userLoginLoading } = useSWR(
    userPassword && userPassword && loginClick ? [userLogin.key, loginClick] : null,
    () =>
      userLogin.fetcher({
        email: userName,
        password: userPassword,
      }),
    { revalidateOnFocus: false }
  )

  useEffect(() => {
    if (!userLoginData) return
    if (userLoginData?.code === 200) {
      setLocalStorage('userToken', JSON.stringify(userLoginData?.data))
      router.push('/')
    } else {
      toast({
        status: 'error',
        duration: 3000,
        isClosable: true,
        render: () => <FailToast>{userLoginData?.msg}</FailToast>,
      })
      setLoginClick.off()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userLoginData])

  // 点击登录，并检查是否为空
  const login = () => {
    if (userName === '') {
      toast({
        status: 'error',
        duration: 3000,
        isClosable: true,
        render: () => <FailToast>{t('loginUserNameErr') as string}</FailToast>,
      })
      return
    }
    if (userPassword === '') {
      toast({
        status: 'error',
        duration: 3000,
        isClosable: true,
        render: () => <FailToast>{t('loginUserPassWordErr') as string}</FailToast>,
      })
      return
    }
    setLoginClick.on()
  }

  return (
    <Flex
      w="full"
      h="100vh"
      flexDir="column"
      alignItems="center"
      pt="67px"
      bg="linear-gradient( 113deg, #212121 0%, #333837 100%)"
    >
      <Image src={miniLogo} w="106px" h="106px" />
      {/* content */}
      <Flex
        flexDir="column"
        w="full"
        h="63%"
        p="48px 32px 0"
        borderTopRadius="32px"
        bgColor="white.100"
        pos="fixed"
        bottom="0"
        left="0"
        boxSizing="border-box"
      >
        <Text fontWeight="600" fontSize="28px" lineHeight="1" mb="48px">
          {t('loginUserTitle') as string}
        </Text>
        <BaseInput
          mb="20px"
          placeholder={t('loginUserName')}
          value={userName}
          onChange={(val) => setUserName(val?.target?.value)}
        />
        <BaseInput
          password
          mb="8px"
          placeholder={t('loginUserPWD')}
          value={userPassword}
          onChange={(val) => setUserPassword(val?.target?.value)}
        />
        <Text ml="auto" mb="40px" color="green.100" fontSize="12px" lineHeight="24px">
          {t('forgetPWD') as string}
        </Text>
        <BaseButton mb="15px" isLoading={userLoginLoading} onClick={() => login()}>
          {t('loginButton') as string}
        </BaseButton>
        <BaseButton
          bgColor="transparent"
          color="black.200"
          onClick={() => router.push('/registration')}
        >
          {t('registrationButton') as string}
        </BaseButton>
      </Flex>
    </Flex>
  )
}

export const getServerSideProps = async (ctx: GetI18nServerSideProps) => {
  return {
    props: { ...(await getI18nSSRProps(ctx, ['home'])) },
  }
}
export default Login
