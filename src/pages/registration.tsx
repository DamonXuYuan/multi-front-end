import React, { useEffect, useState } from 'react'
import { Flex, Grid, Text, useBoolean, useToast } from '@chakra-ui/react'
import { getI18nSSRProps, GetI18nServerSideProps } from '@/utils/i18n'
import { useTranslation } from 'next-i18next'
import BaseInput from '@/components/BaseInput'
import BaseButton from '@/components/BaseButton'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { sendCode, userRegister } from '@/api/login'
import { setLocalStorage } from '@/utils/storage'
import { FailToast, SuccessToast } from '@/components/BaseToast'

function App() {
  const { t } = useTranslation(['home'])
  const router = useRouter()
  const toast = useToast()
  const [userPassword, setUserPassword] = useState('')
  const [userPasswordErr, setUserPasswordErr] = useState('')
  const [comfirmUserPassword, setComfirmUserPassword] = useState('')
  const [comfirmUserPasswordErr, setComfirmUserPasswordErr] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userEmailErr, setUserEmailErr] = useState('')
  const [captcha, setCaptcha] = useState('')
  const [captchaErr, setCaptchaErr] = useState('')
  const [invitationCode, setinvitationCode] = useState('')
  const [registerClick, setRegister] = useBoolean(false)
  const [sendEmailCode, setSendEmailCode] = useBoolean(false)

  const { data: userRegisterData, isLoading: registerLoading } = useSWR(
    userPassword && comfirmUserPassword && userEmail && captcha && registerClick
      ? [userRegister.key, registerClick]
      : null,
    () =>
      userRegister.fetcher({
        email: userEmail,
        password: userPassword,
        pay_password: comfirmUserPassword,
        sms_code: captcha,
        user_code: invitationCode,
      }),
    { revalidateOnFocus: false }
  )

  const { data: sendCodeData } = useSWR(
    userEmail && sendEmailCode ? [sendCode.key, sendEmailCode] : null,
    () =>
      userRegister.fetcher({
        email: userEmail,
      }),
    { revalidateOnFocus: false }
  )

  useEffect(() => {
    if (!userRegisterData) return
    if (userRegisterData?.code === 200) {
      setLocalStorage('userInfo', JSON.stringify(userRegisterData?.data))
      router.push('/registrationSuccess')
    } else {
      toast({
        status: 'error',
        duration: 3000,
        isClosable: true,
        render: () => <FailToast>{userRegisterData?.data?.message}</FailToast>,
      })
      setRegister.off()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userRegisterData])

  useEffect(() => {
    if (!sendCodeData) return
    if (sendCodeData?.code === 200) {
      toast({
        status: 'success',
        duration: 3000,
        isClosable: true,
        render: () => <SuccessToast>{t('sendCodeSuccess') as string}</SuccessToast>,
      })
    } else {
      toast({
        status: 'error',
        duration: 3000,
        isClosable: true,
        render: () => <FailToast>{sendCodeData?.data?.message}</FailToast>,
      })
    }
    setSendEmailCode.off()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sendCodeData])

  // 注册点击事件, 并二次检查
  const clickRegister = () => {
    // 检查密码长度是否在6到12位之间
    const regexUser = /^.{6,12}$/
    if (!regexUser.test(userPassword)) {
      toast({
        status: 'error',
        duration: 3000,
        isClosable: true,
        render: () => <FailToast>{t('registrationErrorUserPassWord') as string}</FailToast>,
      })
      return
    }
    // 检查两次输入是否一致
    if (userPassword !== comfirmUserPassword) {
      toast({
        status: 'error',
        duration: 3000,
        isClosable: true,
        render: () => <FailToast>{t('registrationErrorComfirmPassWord') as string}</FailToast>,
      })
      return
    }
    // 检查邮箱是否是常规email格式
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!regexEmail.test(userEmail)) {
      toast({
        status: 'error',
        duration: 3000,
        isClosable: true,
        render: () => <FailToast>{t('registrationErrorEmail') as string}</FailToast>,
      })
      return
    }
    // 检查是否是6位验证码
    if (captcha.length !== 6) {
      toast({
        status: 'error',
        duration: 3000,
        isClosable: true,
        render: () => <FailToast>{t('registrationErrorCaptcha') as string}</FailToast>,
      })
      return
    }
    setRegister.on()
  }

  return (
    <Flex flexDir="column" w="full" p="35px 32px">
      <Text fontWeight="600" fontSize="28px" lineHeight="1" mb="23px">
        {t('registrationTitle') as string}
      </Text>
      {/* inputs */}
      <Grid gap="23px" mb="40px">
        <BaseInput
          password
          errorText={userPasswordErr}
          placeholder={t('registrationUserPWD')}
          value={userPassword}
          onChange={(val) => setUserPassword(val?.target?.value)}
          onBlur={() => {
            // 正则表达式，检查文本长度是否在6到12位之间
            const regex = /^.{6,12}$/
            // 测试文本是否匹配正则表达式
            if (regex.test(userPassword)) {
              setUserPasswordErr('')
            } else {
              setUserPasswordErr(t('registrationErrorUserPassWord'))
            }
          }}
        />
        <BaseInput
          password
          errorText={comfirmUserPasswordErr}
          placeholder={t('registrationUserPWDConfirm')}
          value={comfirmUserPassword}
          onChange={(val) => setComfirmUserPassword(val?.target?.value)}
          onBlur={() => {
            // 检查两次输入是否一致
            if (userPassword === comfirmUserPassword) {
              setComfirmUserPasswordErr('')
            } else {
              setComfirmUserPasswordErr(t('registrationErrorComfirmPassWord'))
            }
          }}
        />
        <BaseInput
          errorText={userEmailErr}
          placeholder={t('registrationUserEmail')}
          value={userEmail}
          onChange={(val) => setUserEmail(val?.target?.value)}
          onBlur={() => {
            // 正则表达式，检查字段是否是常规email格式
            const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
            // 测试字段是否匹配正则表达式
            if (regex.test(userEmail)) {
              setUserEmailErr('')
            } else {
              setUserEmailErr(t('registrationErrorEmail'))
            }
          }}
        />
        <BaseInput
          captcha
          maxLength={6}
          errorText={captchaErr}
          placeholder={t('captcha')}
          value={captcha}
          onChange={(val) => setCaptcha(val?.target?.value)}
          onBlur={() => {
            // 检查是否是6位验证码
            if (captcha.length === 6) {
              setCaptchaErr('')
            } else {
              setCaptchaErr(t('registrationErrorCaptcha'))
            }
          }}
          captchaClick={() => setSendEmailCode.on()}
        />
        <BaseInput
          placeholder={t('invitationCode')}
          value={invitationCode}
          onChange={(val) => setinvitationCode(val?.target?.value)}
        />
      </Grid>
      <BaseButton
        isLoading={registerLoading}
        loadingText={t('registrationButton') as string}
        mb="24px"
        onClick={() => clickRegister()}
      >
        {t('registrationButton') as string}
      </BaseButton>
      <Flex justifyContent="center" fontSize="14px" onClick={() => router.push('/login')}>
        <Text>{t('registrationTips1') as string}</Text>
        <Text color="green.100">{t('registrationTips2') as string}</Text>
      </Flex>
    </Flex>
  )
}

export const getServerSideProps = async (ctx: GetI18nServerSideProps) => {
  return {
    props: { ...(await getI18nSSRProps(ctx, ['home'])) },
  }
}
export default App
