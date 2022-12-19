import type { AppProps } from 'next/app'
import { AsyncLayersProvider } from '../lib'
import { css, Global } from '@emotion/react'

const global = css`
  body {
    margin: 0;
    padding: 0;
  }
`

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Global styles={global} />
      <AsyncLayersProvider>
        <Component {...pageProps} />
      </AsyncLayersProvider>
    </>
  )
}
