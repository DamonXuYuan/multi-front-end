import React, { useEffect } from 'react'
import { Box, Flex, Text} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import Navbar from '@/components/NavBar'
import { ChevronLeft, Check } from 'lucide-react'
import { getI18nSSRProps, GetI18nServerSideProps } from '@/utils/i18n'
import { useTranslation } from 'next-i18next'
import { setLocalStorage, getLocalStorage } from '@/utils/storage'

const IndexPage = () => {
  const { t } = useTranslation(['user'])
  const router = useRouter()
  const handleBack = () => {
    router.back()
  }
  const [language, setLanguage] = React.useState('')
  const [languageArr] = React.useState([
    { name: 'English', value: 'en' },
  ])
  const changeLanguage = (value: string) => { 
    setLanguage(value)
    setLocalStorage('lang', value)
  }
  useEffect(() => {
    setLanguage(getLocalStorage('lang') || 'en')
  }
  , [])
  return (
    <Box margin="auto" pt="44px" pb="48px" bg="#fff" minHeight="100vh">
      <Navbar
        title={t('systemLanguage') as string}
        isFixed={true}
        leftContent={<ChevronLeft onClick={handleBack} />}
      />
      {
        languageArr.map((item, index) => (
          <Flex justify="space-between" align="center" height={20} p={4} key={index} onClick={() => changeLanguage(item.value)}>
            <Text fontSize="14px" color={ language === item.value ? 'green.100' : 'gray' }>{item.name}</Text>
            {language === item.value && <Check color="#51CEAA" strokeWidth={2}/>}
          </Flex>
        ))
      }
    </Box>
  )
}
export const getServerSideProps = async (ctx: GetI18nServerSideProps) => {
  return {
    props: { ...(await getI18nSSRProps(ctx, ['user'])) },
  }
}
export default IndexPage
