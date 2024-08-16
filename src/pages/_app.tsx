import { ChakraProvider } from '@chakra-ui/react'
import Head from 'next/head'
import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import { getI18nSSRProps, GetI18nStaticProps } from '@/utils/i18n'
import theme from '@/theme'
import { useRouter } from 'next/router'
import '@/styles/global.scss'
import 'react-toastify/dist/ReactToastify.css'

import '@rainbow-me/rainbowkit/styles.css'
import { getDefaultConfig, RainbowKitProvider, Locale } from '@rainbow-me/rainbowkit'
import { WagmiProvider } from 'wagmi'
import { bscTestnet } from 'wagmi/chains'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

function App({ Component, pageProps }: AppProps) {
  const { locale } = useRouter() as { locale: Locale }

  const config = getDefaultConfig({
    appName: 'Multi',
    projectId: '734798448c471d6d73535535765d58cc',
    chains: [bscTestnet],
    ssr: true, // If your dApp uses server side rendering (SSR)
  })

  const queryClient = new QueryClient()

  return (
    <>
      <Head>
        <title>Multi</title>
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
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider locale={locale}>
            <ChakraProvider resetCSS theme={theme}>
              {/* <Header /> */}
              <Component {...(pageProps ?? {})} />
              {/* </ModalProvider> */}
            </ChakraProvider>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
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
