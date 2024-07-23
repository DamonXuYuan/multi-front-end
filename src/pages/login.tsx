import React, { useState } from 'react'
import { Flex, Image, Text } from '@chakra-ui/react'
import { getI18nSSRProps, GetI18nServerSideProps } from '@/utils/i18n'
import miniLogo from '@/assets/imgs/miniLogo.png'
import { useTranslation } from 'next-i18next'
import BaseInput from '@/components/BaseInput'
import BaseButton from '@/components/BaseButton'
import { useRouter } from 'next/router'

function App() {
  const { t } = useTranslation(['home'])
  const [userName, setUserName] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const router = useRouter()

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
          mb="8px"
          placeholder={t('loginUserPWD')}
          password
          value={userPassword}
          onChange={(val) => setUserPassword(val?.target?.value)}
        />
        <Text ml="auto" mb="40px" color="green.100" fontSize="12px" lineHeight="24px">
          {t('forgetPWD') as string}
        </Text>
        <BaseButton mb="15px">{t('loginButton') as string}</BaseButton>
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
export default App
