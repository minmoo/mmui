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
  const { show } = useLayers(Content, {
    type: 'center',
    transitionDelay: 1000,
  })
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
  width: 700px;
  height: 200px;
  background: blue;
`
const Box2 = styled.div`
  display: flex;

  height: 300px;
  width: 600px;
  background: pink;
`

function Content() {
  const { show } = useLayers(Content2, {
    type: 'center',
  })
  return (
    <>
      <h2>Content</h2>
      <button onClick={() => show()}>a</button>
      <Box />
    </>
  )
}

function Content2() {
  const { show } = useLayers(Content, {
    type: 'bottom',
    transitionDelay: 0,
    draggable: true,
  })
  return (
    <div>
      <h2>Content2</h2>
      <button onClick={() => show()}>b</button>
      <Box2 />
    </div>
  )
}
