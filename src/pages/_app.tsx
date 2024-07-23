import { ChakraProvider } from '@chakra-ui/react'
import Head from 'next/head'
import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'

import { getI18nSSRProps, GetI18nStaticProps } from '@/utils/i18n'
import theme from '@/theme'
import '@/styles/global.scss'
import Header from '@/components/Header'

// const { publicRuntimeConfig } = getConfig()

function App({ Component, pageProps }: AppProps) {
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
        <Header />
        <Component {...(pageProps ?? {})} />
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
