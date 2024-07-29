import React from 'react'
import { Box, VStack, Flex, Text, Image, HStack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import Navbar from '@/components/NavBar'
import { ChevronLeft } from 'lucide-react'
import { getI18nSSRProps, GetI18nServerSideProps } from '@/utils/i18n'
import { useTranslation } from 'next-i18next'
// import useSWR from 'swr'
// import { boxInfo } from '@/api/box'
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
const BoxListPage = () => {
  const { t } = useTranslation(['home'])
  const router = useRouter()
  const handleBack = () => {
    router.back()
  }
  return (
    <Box margin="auto" pt="44px" pb="48px" bg="#FAFAFA" minHeight="100vh">
      <Navbar
        title={t('userPageTitle') as string}
        isFixed={true}
        leftContent={<ChevronLeft onClick={handleBack} />}
      />
      <VStack align="stretch" spacing="12px" px="12px" pt="12px" position="relative" zIndex={1}>
        <Flex p="12px" flexDirection="row" justifyContent="space-between" alignItems="center">
          <HStack>
            <Image
              src={inviteBg}
              alt="user"
              objectFit="cover"
              width="64px"
              height="64px"
              borderRadius="50%"
            />
            <Box>
              <Text fontSize="16px" color="#0F182C" mb="12px" fontWeight="bold">
                开启时间
              </Text>
              <Text fontSize="12px" color="#C6CDD5">
                2024-06-01 12:23:02
              </Text>
            </Box>
          </HStack>
          <Image
            src={setting}
            alt="Blind Box"
            objectFit="cover"
            width="24px"
            height="24px"
            borderRadius="4px"
          />
        </Flex>
        <Image
          src={inviteBg}
          alt="Blind Box"
          objectFit="cover"
          width="100%"
          height="64px"
          borderRadius="4px"
        />
        <Flex bg="#fff" p="12px" flexDirection="row" alignItems="center">
          <HStack flex="1">
            <Image
              src={like}
              alt="Blind Box"
              objectFit="cover"
              width="24px"
              height="24px"
              borderRadius="4px"
            />
            <Text fontSize="14px" fontWeight="bold" color="#0F182C">
              我的藏品
            </Text>
          </HStack>
          <HStack flex="1">
            <Image
              src={wbag}
              alt="Blind Box"
              objectFit="cover"
              width="24px"
              height="24px"
              borderRadius="4px"
            />
            <Text fontSize="14px" fontWeight="bold" color="#0F182C">
              我的钱包
            </Text>
          </HStack>
        </Flex>
        <Flex
          bg="#fff"
          p="12px"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <HStack>
            <Image
              src={orderImgs}
              alt="Blind Box"
              objectFit="cover"
              width="24px"
              height="24px"
              borderRadius="4px"
            />
            <Text fontSize="14px" color="#0F182C">
              开启时间
            </Text>
          </HStack>
          <Image
            src={arrowRight}
            alt="Blind Box"
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
          >
            <HStack>
              <Image
                src={lgue}
                alt="Blind Box"
                objectFit="cover"
                width="24px"
                height="24px"
                borderRadius="4px"
              />
              <Text fontSize="14px" color="#0F182C">
                系统语言
              </Text>
            </HStack>
            <Image
              src={arrowRight}
              alt="Blind Box"
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
          >
            <HStack>
              <Image
                src={safe}
                alt="Blind Box"
                objectFit="cover"
                width="24px"
                height="24px"
                borderRadius="4px"
              />
              <Text fontSize="14px" color="#0F182C">
                账号与安全
              </Text>
            </HStack>
            <Image
              src={arrowRight}
              alt="Blind Box"
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
          >
            <HStack>
              <Image
                src={about}
                alt="Blind Box"
                objectFit="cover"
                width="24px"
                height="24px"
                borderRadius="4px"
              />
              <Text fontSize="14px" color="#0F182C">
                关于我们
              </Text>
            </HStack>
            <Image
              src={arrowRight}
              alt="Blind Box"
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
        >
          <HStack>
            <Image
              src={logout}
              alt="Blind Box"
              objectFit="cover"
              width="24px"
              height="24px"
              borderRadius="4px"
            />
            <Text fontSize="14px" color="#0F182C">
              退出登录
            </Text>
          </HStack>
          <Image
            src={arrowRight}
            alt="Blind Box"
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
    props: { ...(await getI18nSSRProps(ctx, ['home'])) },
  }
}
export default BoxListPage
