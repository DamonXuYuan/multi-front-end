import React from 'react'
import { Flex, Text } from '@chakra-ui/react'
import { getI18nSSRProps, GetI18nServerSideProps } from '@/utils/i18n'
// import { useTranslation } from 'next-i18next'
import Navbar from '@/components/NavBar'
import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/router'

import walletBg from '@/assets/imgs/walletBg.png'
import walletCardBg from '@/assets/imgs/walletCardBg.png'
// import BaseButton from '@/components/BaseButton'
import { ConnectButton } from '@rainbow-me/rainbowkit'

const Wallet = () => {
  // const { t } = useTranslation(['box'])
  const router = useRouter()

  const handleBack = () => {
    router.back()
  }

  const ConnectWallet = () => {
    return (
      <Flex flexDir="column">
        {/* <BaseButton bgColor="green.100">Connect Wallet</BaseButton> */}
        <ConnectButton />
      </Flex>
    )
  }

  return (
    <Flex flexDir="column" bgColor="white.300">
      <Flex
        pos="relative"
        flexDir="column"
        w="full"
        h="240px"
        __css={{
          bgImage: walletBg,
          bgSize: '100%',
        }}
      >
        <Navbar
          title="walet"
          titleColor="white"
          bg="transparent"
          leftContent={<ChevronLeft color="white" onClick={handleBack} />}
          rightContent={<Text color="white">交易明细</Text>}
        />
        <Flex
          display="flex"
          flexDir="column"
          justifyContent="center"
          w="350px"
          h="186px"
          pos="absolute"
          m="auto"
          top="68px"
          left="0"
          right="0"
          bgColor="white"
          borderRadius="16px"
          p="24px 16px"
          boxSizing="border-box"
          __css={{
            bgImage: walletCardBg,
            bgSize: '100%',
          }}
        >
          <ConnectWallet />
        </Flex>
      </Flex>
    </Flex>
  )
}

export const getServerSideProps = async (ctx: GetI18nServerSideProps) => {
  return {
    props: { ...(await getI18nSSRProps(ctx, ['box'])) },
  }
}
export default Wallet
