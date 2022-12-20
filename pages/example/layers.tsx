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
  const { show } = useLayers(Content, { type: 'dialog' })
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
  height: 200px;
  background: blue;
`

function Content() {
  const { show } = useLayers(Content2, { type: 'bottomsheet' })
  return (
    <>
      <button onClick={() => show()}>a</button>
      <Box />
    </>
  )
}

function Content2() {
  const { show } = useLayers(Content, { type: 'dialog' })
  return (
    <>
      <button onClick={() => show()}>b</button>
      <Box />
    </>
  )
}
