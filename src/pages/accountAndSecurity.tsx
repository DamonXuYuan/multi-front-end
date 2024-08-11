import React, { useEffect } from 'react'
import { Box, Flex, Text,Drawer, DrawerContent, DrawerBody, Button, DrawerOverlay } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import Navbar from '@/components/NavBar'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { getI18nSSRProps, GetI18nServerSideProps } from '@/utils/i18n'
import { useTranslation } from 'next-i18next'
import { getLocalStorage } from '@/utils/storage'


const IndexPage = () => {
  const { t } = useTranslation(['user'])
  const router = useRouter()
  const handleBack = () => {
    router.back()
  }
  const onClose = () => { 
    setIsOpen(false)
  }
  const handleEmail = () => {
    setIsOpen(true)
  }
  
  const [isOpen, setIsOpen] = React.useState(false)
  const [userInfo, setUserInfo] = React.useState<any>({})
  useEffect(() => {
    const user = getLocalStorage('userInfo')
    if(user) {
      const data  = JSON.parse(user)
      setUserInfo(data.userInfo || {})
    }
  }
  , [])
  return (
    <Box margin="auto" pt="44px" pb="48px" bg="#fff" minHeight="100vh">
      <Navbar
        title={t('accountAndSecurity') as string}
        isFixed={true}
        leftContent={<ChevronLeft onClick={handleBack} />}
      />
      <Flex justify="space-between" align="center" p={4} onClick={handleEmail}>
        <Text fontSize="14px">邮箱</Text>
        <Flex align="center">
          <Text color="gray.500" mr={2}>{userInfo.email}</Text>
          <ChevronRight color="#C6CDD5" strokeWidth={1.5}/>
        </Flex>
      </Flex>
      <Flex justify="space-between" align="center" p={4} onClick={() => { router.push('/changePassword') }}>
        <Text fontSize="14px">修改密码</Text>
        <ChevronRight color="#C6CDD5" strokeWidth={1.5}/>
      </Flex>
      <Drawer
        isOpen={isOpen}
        placement="bottom"
        onClose={onClose}
        closeOnOverlayClick={false}
        size="md"
      >
        <DrawerOverlay />
        <DrawerContent bg="#fff" height={40} borderTopLeftRadius={10} borderTopRightRadius={10}>
          <DrawerBody>
            <Box>
              <Button
                variant="ghost"
                width="100%"
                textAlign="left"
                fontSize={14}
                onClick={() =>     
                  router.push('/changeEmail')
                }
              >
                更换邮箱
              </Button>
              <Button
                mt={4}
                fontSize={14}
                variant="ghost"
                width="100%"
                textAlign="left"
                onClick={onClose}
              >
                取消
              </Button>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  )
}
export const getServerSideProps = async (ctx: GetI18nServerSideProps) => {
  return {
    props: { ...(await getI18nSSRProps(ctx, ['user'])) },
  }
}
export default IndexPage
