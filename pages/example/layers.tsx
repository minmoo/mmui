import { AsyncLayersProvider, useLayers } from '@/packages/async-layers/lib'
// import { AsyncLayersProvider, useLayers } from '@minmoo/async-layers'
import styled from '@emotion/styled'
import Head from 'next/head'

export default function Layers() {
  return (
    <AsyncLayersProvider options={{ position: 'top', transitionDelay: 1000 }}>
      <Example />
    </AsyncLayersProvider>
  )
}

function Example() {
  const { show: showBottom } = useLayers(Content, {
    position: 'bottom',
    transitionDelay: 500,
  })
  const { show: showLeft } = useLayers(Content, {
    position: 'left',
    transitionDelay: 300,
  })
  const { show: showRight } = useLayers(Content, {
    position: 'right',
    transitionDelay: 700,
  })
  const { show: showTop } = useLayers(Content, {
    position: 'top',
    transitionDelay: 100,
  })
  const { show: showCenter } = useLayers(Content, {
    position: 'center',
    transitionDelay: 200,
  })

  const { show: showDragBottom } = useLayers(Content, {
    position: 'bottom',
    transitionDelay: 500,
    draggable: true,
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
        <div
          style={{ width: '100%', height: '400px', backgroundColor: 'blue' }}
        ></div>
        <button onClick={() => showBottom()}>Bottom Button</button>
        <button onClick={() => showLeft()}>Left Button</button>
        <button onClick={() => showRight()}>Right Button</button>
        <button onClick={() => showTop()}>Top Button</button>
        <button onClick={() => showCenter()}>Center Button</button>
        <button onClick={() => showDragBottom()}>Drag Bottom Button</button>
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
    position: 'center',
  })
  return (
    <>
      <h2>Content</h2>
      <button onClick={() => show()}>Center Button</button>
      <Box />
    </>
  )
}

function Content2({ onClose }: { onClose: () => void }) {
  return (
    <div>
      <h2>Content2</h2>
      <button onClick={() => onClose()}>Close Button</button>
      <Box2 />
    </div>
  )
}
