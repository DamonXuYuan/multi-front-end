import React, { useState } from 'react'
import { Box, Button, Flex, FormControl, Input, useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import Navbar from '@/components/NavBar'
import { ChevronLeft } from 'lucide-react'
import { getI18nSSRProps, GetI18nServerSideProps } from '@/utils/i18n'
import { useTranslation } from 'next-i18next'
import { sendEmailCode, editPassword } from '@/api/user'

const IndexPage = () => {
  const { t } = useTranslation(['user'])
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [verificationCode, setVerificationCode] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [isCountingDown, setIsCountingDown] = useState(false)
  const [countdown, setCountdown] = useState(60)
  const toast = useToast()

  const handleBack = () => {
    router.back()
  }
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }
  const handleGetVerificationCode = async () => {
    if (!validateEmail(email)) {
      toast({
        title: t('invalidEmailAddress'),
        description: t('enterValidEmailAddress'),
        status: 'warning',
        duration: 3000,
        isClosable: true,
      })
      return
    }
    const res = await sendEmailCode.fetcher({ email, type: 2 })
    if (res.code !== 200) {
      toast({
        title: t('verificationCodeSendFailed'),
        description: res.msg,
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      return
    }
    setIsCountingDown(true)
    setCountdown(60)
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(interval)
          setIsCountingDown(false)
        }
        return prev - 1
      })
    }, 1000)
    toast({
      title: t('verificationCodeSent'),
      description: t('checkYourEmailForCode'),
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
  }
  const handleSubmit = async () => {
    if (!validateEmail(email)) {
      toast({
        title: t('invalidEmailAddress'),
        description: t('enterValidEmailAddress'),
        status: 'warning',
        duration: 3000,
        isClosable: true,
      })
      return
    }
    if (!verificationCode) {
      toast({
        title: t('verificationCodeCannotBeEmpty'),
        description: t('enterVerificationCode'),
        status: 'warning',
        duration: 3000,
        isClosable: true,
      })
      return
    }
    if (!password) {
      toast({
        title: t('passwordCannotBeEmpty'),
        description: t('enterPassword'),
        status: 'warning',
        duration: 3000,
        isClosable: true,
      })
      return
    }
    if (password !== password2) {
      toast({
        title: t('passwordsDoNotMatch'),
        description: t('confirmPasswordsMatch'),
        status: 'warning',
        duration: 3000,
        isClosable: true,
      })
      return
    }
    const res = await editPassword.fetcher({ email, code: verificationCode, password })
    if (res.code !== 200) {
      toast({
        description: res.msg,
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      return
    }
    toast({
      title: t('changeSuccess'),
      description: t('passwordChangeSuccess'),
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
    // to do 清除用户信息
    router.replace('/login')
  }
  return (
    <Box margin="auto" pt="44px" pb="48px" bg="#fff" minHeight="100vh">
      <Navbar
        title={t('changePassword')}
        isFixed={true}
        leftContent={<ChevronLeft onClick={handleBack} />}
      />
      <Box p={8}>
        <FormControl id="email" mb={4}>
          <Box borderBottom="1px solid #eee" py={2}>
            <Input
              border="none"
              type="email"
              placeholder={t('enterEmail')}
              size="md"
              variant="outline"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Box>
        </FormControl>
        <FormControl id="verification-code" mb={6}>
          <Flex justify="space-between" align="center" borderBottom="1px solid #eaeaea" py={2}>
            <Input
              border="none"
              type="text"
              placeholder={t('enterVerificationCode')}
              size="md"
              variant="outline"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />
            <Button
              variant="link"
              color="green.100"
              size="lg"
              onClick={handleGetVerificationCode}
              isDisabled={isCountingDown}
            >
              {isCountingDown ? t('resendCode', { countdown }) : t('getVerificationCode')}
            </Button>
          </Flex>
        </FormControl>
        <FormControl id="password" mb={6}>
          <Flex justify="space-between" align="center" borderBottom="1px solid #eaeaea" py={2}>
            <Input
              border="none"
              type="password"
              placeholder={t('enterPassword')}
              size="md"
              variant="outline"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Flex>
        </FormControl>
        <FormControl id="password2" mb={6}>
          <Flex justify="space-between" align="center" borderBottom="1px solid #eaeaea" py={2}>
            <Input
              border="none"
              type="password"
              placeholder={t('confirmPassword')}
              size="md"
              variant="outline"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            />
          </Flex>
        </FormControl>
        <Button
          mt="20px"
          color="gray.50"
          background="green.100"
          size="lg"
          width="full"
          borderRadius="full"
          onClick={handleSubmit}
        >
          {t('complete')}
        </Button>
      </Box>
    </Box>
  )
}
export const getServerSideProps = async (ctx: GetI18nServerSideProps) => {
  return {
    props: { ...(await getI18nSSRProps(ctx, ['user'])) },
  }
}
export default IndexPage