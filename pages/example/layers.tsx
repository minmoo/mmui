import { AsyncLayersProvider, useLayers } from '@/packages/async-layers/lib'
import styled from '@emotion/styled'
import Head from 'next/head'

export default function Layers() {
  return (
    <AsyncLayersProvider>
      <Example />
    </AsyncLayersProvider>
  )
}

function Example() {
  const { show } = useLayers(Content, { draggable: true })
  return (
    <>
      <Head>
        <title>Async Layers</title>
        <meta name="description" content="Async Layers" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <div>async layers</div>
        <button onClick={() => show()}>Button</button>
        <div
          style={{
            width: '100%',
            height: '3000px',
            backgroundColor: 'yellow',
          }}
        ></div>
        <button onClick={() => show()}>Button</button>
      </main>
    </>
  )
}

const Box = styled.div`
  display: flex;
  width: 500px;
  height: 100px;
  background: blue;
`

function Content() {
  return <Box />
}
