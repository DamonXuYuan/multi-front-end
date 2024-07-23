import React, { useState } from 'react'
import { Flex, Grid, Text } from '@chakra-ui/react'
import { getI18nSSRProps, GetI18nServerSideProps } from '@/utils/i18n'
import { useTranslation } from 'next-i18next'
import BaseInput from '@/components/BaseInput'
import BaseButton from '@/components/BaseButton'
import { useRouter } from 'next/router'

function App() {
  const { t } = useTranslation(['home'])
  const router = useRouter()
  const [userName, setUserName] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [ComfirmUserPassword, setComfirmUserPassword] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [captcha, setCaptcha] = useState('')
  const [invitationCode, setinvitationCode] = useState('')

  return (
    <Flex flexDir="column" w="full" p="35px 32px">
      <Text fontWeight="600" fontSize="28px" lineHeight="1" mb="23px">
        {t('registrationTitle') as string}
      </Text>
      {/* inputs */}
      <Grid gap="23px" mb="40px">
        <BaseInput
          placeholder={t('registrationUserName')}
          value={userName}
          onChange={(val) => setUserName(val?.target?.value)}
        />
        <BaseInput
          password
          placeholder={t('registrationUserPWD')}
          value={userPassword}
          onChange={(val) => setUserPassword(val?.target?.value)}
        />
        <BaseInput
          password
          placeholder={t('registrationUserPWDConfirm')}
          value={ComfirmUserPassword}
          onChange={(val) => setComfirmUserPassword(val?.target?.value)}
        />
        <BaseInput
          password
          placeholder={t('registrationUserEmail')}
          value={userEmail}
          onChange={(val) => setUserEmail(val?.target?.value)}
        />
        <BaseInput
          captcha
          placeholder={t('captcha')}
          value={captcha}
          onChange={(val) => setCaptcha(val?.target?.value)}
        />
        <BaseInput
          placeholder={t('invitationCode')}
          value={invitationCode}
          onChange={(val) => setinvitationCode(val?.target?.value)}
        />
      </Grid>
      <BaseButton mb="24px" onClick={() => router.push('/registrationSuccess')}>
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
