import Head from 'next/head'
import { PublishButton } from '@minmoo/publish-rollup'

export default function Publish() {
  return (
    <>
      <Head>
        <title>Publish</title>
        <meta name="description" content="Async Layers" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <div>publish</div>
        <PublishButton onClick={() => alert('hi')}>PUBLISHBUTTON</PublishButton>
        <div
          style={{ width: '100%', height: '500px', backgroundColor: 'blue' }}
        ></div>

        <div
          style={{
            width: '100%',
            height: '3000px',
            backgroundColor: 'yellow',
          }}
        ></div>
      </main>
    </>
  )
}
