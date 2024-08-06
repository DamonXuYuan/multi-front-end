import { ChakraProvider } from '@chakra-ui/react'
import Head from 'next/head'
import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import { getI18nSSRProps, GetI18nStaticProps } from '@/utils/i18n'
import theme from '@/theme'
import '@/styles/global.scss'
import 'react-toastify/dist/ReactToastify.css'
// import { ModalProvider } from '@particle-network/connectkit'
import { BNBChain, BNBChainTestnet } from '@particle-network/chains'
// import { evmWallets, solanaWallets } from '@particle-network/connectors'
// import { ConnectButton } from '@particle-network/connectkit'

import { AuthCoreContextProvider, PromptSettingType } from '@particle-network/auth-core-modal'
import { AuthType } from '@particle-network/auth-core'
// import { useConnect } from '@particle-network/auth-core-modal'
// import { useEthereum } from '@particle-network/auth-core-modal'
// import { ethers } from 'ethers'

import '@particle-network/connectkit/dist/index.css'

function App({ Component, pageProps }: AppProps) {
  // Particle Auth Core

  // const { provider } = useEthereum()

  // const ethersProvider = new ethers.providers.Web3Provider(provider, 'any')
  // console.log(ethersProvider, 666)
  // const { provider } = useEthereum()

  // const initParticle = () => {
  //   const particle = new ParticleNetwork({
  //     projectId: '28a26897-dac2-48f0-a782-97cf1ca2504a',
  //     clientKey: 'cgm8InM2WYLxqrEgoXQcz38ycs1B71yirhBsHUgp',
  //     appId: '15be2a6b-8c73-4290-939d-b6de2482a5e3',
  //     chainName: BNBChainTestnet.name, // Optional: resolves to 'ethereum' both in this case & by default
  //     chainId: BNBChainTestnet.id, // Optional: resolves to 1 both in this case & by default
  //     wallet: {
  //       // Optional: object controlling additional configurations
  //       displayWalletEntry: true, // Whether or not the wallet popup is shown on-screen after login
  //       defaultWalletEntryPosition: WalletEntryPosition.BR, // If the former is true, the position in which the popup appears
  //       uiMode: 'dark', // Light or dark, if left blank, aligns with web auth default
  //       supportChains: [{ id: 1, name: 'BNBChainTestnet' }], // Restricts the chains available within the web wallet interface
  //       customStyle: {}, // If applicable, custom wallet style in JSON
  //     },
  //     securityAccount: {
  //       // Optional: Configuration of security requirements upon login
  //       // If, and in what frequency, will the user be prompted to set a payment password
  //       // 0: None, 1: Once (default), 2: Always
  //       promptSettingWhenSign: 1,
  //       // If, and in what frequency, will the user be prompted to set a master password
  //       // 0: None (default), 1: Once, 2: Always
  //       promptMasterPasswordSettingWhenLogin: 1,
  //     },
  //   })
  //   console.log(particle, 'particle')
  // }

  // useEffect(() => {
  //   initParticle()
  // }, [])

  return (
    <>
      <Head>
        <title>multi-front-end</title>
        <meta charSet="utf-8" />
        <meta name="App-Config" content="fullscreen=yes,useHistoryState=yes,transition=yes" />
        <meta content="yes" name="apple-mobile-web-app-capable" />
        <meta content="yes" name="apple-touch-fullscreen" />
        <meta content="telephone=no,email=no" name="format-detection" />
        <meta
          key="viewport"
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover"
        />
        {/* <link
          rel="shortcut icon"
          href={`${publicRuntimeConfig.cdn}/favicon.ico`}
          type="image/x-icon"
        />
        <link
          href={`${publicRuntimeConfig.cdn}/images/apple-touch-icon-144-precomposed.png`}
          rel="apple-touch-icon-precomposed"
        /> */}
      </Head>
      <ChakraProvider resetCSS theme={theme}>
        {/* <ModalProvider
          options={{
            projectId: '28a26897-dac2-48f0-a782-97cf1ca2504a',
            clientKey: 'cgm8InM2WYLxqrEgoXQcz38ycs1B71yirhBsHUgp',
            appId: '15be2a6b-8c73-4290-939d-b6de2482a5e3',
            chains: [BNBChain, BNBChainTestnet],
            connectors: [
              ...evmWallets({
                projectId: '734798448c471d6d73535535765d58cc',
                showQrModal: true,
              }),
              ...solanaWallets(),
            ],
            erc4337: {
              //optional: account abstraction wallet UI config (displaying the smart account rather than EOA)
              name: 'SIMPLE',
              version: '1.0.0',
            },
            wallet: {
              //optional: particle wallet config
              customStyle: {
                supportChains: [BNBChain, BNBChainTestnet],
              },
            },
          }}
        > */}

        <AuthCoreContextProvider
          options={{
            projectId: '28a26897-dac2-48f0-a782-97cf1ca2504a',
            clientKey: 'cgm8InM2WYLxqrEgoXQcz38ycs1B71yirhBsHUgp',
            appId: '15be2a6b-8c73-4290-939d-b6de2482a5e3',
            authTypes: [AuthType.email, AuthType.google, AuthType.twitter],
            themeType: 'dark',
            fiatCoin: 'USD',
            language: 'en',
            erc4337: {
              name: 'SIMPLE',
              version: '1.0.0',
            },
            promptSettingConfig: {
              promptPaymentPasswordSettingWhenSign: PromptSettingType.first,
              promptMasterPasswordSettingWhenLogin: PromptSettingType.first,
            },
            wallet: {
              visible: true,
              customStyle: {
                supportChains: [BNBChain, BNBChainTestnet],
              },
            },
          }}
        >
          {/* <Header /> */}
          <Component {...(pageProps ?? {})} />
        </AuthCoreContextProvider>
        {/* </ModalProvider> */}
      </ChakraProvider>
    </>
  )
}

export const getStaticProps = async (context: GetI18nStaticProps) => {
  return {
    props: {
      ...(await getI18nSSRProps(context, [])),
    },
  }
}

// 这里要注意，切换语言会导致整体 APP 组件卸载再初始化
export default appWithTranslation(App)
