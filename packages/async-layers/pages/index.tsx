import Head from 'next/head'
import { Content } from '../components/Content'
import { useBottomSheet } from '../lib'

export default function Home() {
  const { show } = useBottomSheet(Content)

  return (
    <>
      <Head>
        <title>Async Layers</title>
        <meta name="description" content="Async Layers" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <div>안녕하세요!!@@</div>
        <button onClick={() => show()}>Button</button>
      </main>
    </>
  )
}
