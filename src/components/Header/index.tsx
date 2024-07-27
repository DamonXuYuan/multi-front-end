import React, { useEffect, useState } from 'react'
import { Text, Flex, Image } from '@chakra-ui/react'
import back from '@/assets/imgs/back.png'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { getLocalStorage, setLocalStorage } from '@/utils/storage'

function Index() {
  const { t } = useTranslation(['home', 'raffle'])
  const router = useRouter()
  const [showBack, setShowBack] = useState(false)
  const [title, setTitle] = useState('Multi')

  useEffect(() => {
    const name = router?.pathname
    if (name === '/') {
      setLocalStorage('pageTitle', t('title'))
      setShowBack(false)
    } else if (name === '/registrations') {
      setLocalStorage('pageTitle', t('registrations'))
      setShowBack(true)
    } else if (name === '/registrationSuccess') {
      setLocalStorage('pageTitle', t('registrationHeader'))
      setShowBack(true)
    } else if (name === '/raffle') {
      setLocalStorage('pageTitle', t('raffle'))
      setShowBack(false)
    } else if (name === '/lottery') {
      setLocalStorage('pageTitle', t('lottery'))
      setShowBack(true)
    } else if (name === '/participate') {
      setLocalStorage('pageTitle', t('NumberOfParticipants'))
      setShowBack(true)
    }
    setTitle(getLocalStorage('pageTitle') as string)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router])

  const backClick = () => {
    if (!showBack) return
    router.back()
  }

  return (
    <Flex
      display={router?.pathname !== '/login' ? 'flex' : 'none'}
      h="44px"
      alignItems="center"
      padding="0 12px"
      bgColor="white.100"
      justify="space-between"
    >
      <Image
        w="24px"
        h="24px"
        src={back}
        ignoreFallback
        opacity={showBack ? 1 : 0}
        onClick={backClick}
      />
      <Text fontSize="18px">{title}</Text>
      <Image w="24px" h="24px" opacity="0" />
    </Flex>
  )
}

export default React.memo(Index)
