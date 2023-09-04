import {
  AsyncLayersProvider,
  useLayers,
  useLayersUtils,
} from '@/packages/async-layers/lib'
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
  const { show: showBottom } = useLayers<void, number>(Content, {
    position: 'bottom',
    transitionDelay: 500,
  })
  const { show: showLeft } = useLayers(Content, {
    position: 'left',
    transitionDelay: 300,
    dimmedType: 'hide',
  })
  const { show: showRight } = useLayers(Content, {
    position: 'right',
    transitionDelay: 700,
    dimmedType: 'hide',
  })
  const { show: showTop } = useLayers(Content, {
    position: 'top',
    transitionDelay: 100,
    dimmedType: 'hide',
  })
  const { show: showCenter } = useLayers(Content, {
    position: 'center',
    transitionDelay: 200,
    dimmedType: 'hide',
  })

  const { show: showDragBottom } = useLayers(Content, {
    position: 'bottom',
    transitionDelay: 500,
    draggable: true,
    dimmedType: 'hide',
  })

  const { show: showDragBottomScroll } = useLayers(Content3, {
    position: 'bottom',
    transitionDelay: 500,
    draggable: true,
    dimmedType: 'hide',
    dragOptions: {
      minHeight: 500,
      minY: 100,
    },
  })

  const { hideLatest } = useLayersUtils()

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
        <button onClick={() => showDragBottomScroll()}>
          Drag Bottom Button with Scroll
        </button>
        <button onClick={() => hideLatest()}>hideLatest</button>
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

const Box3 = styled.div`
  display: flex;
  width: 700px;
  height: 200vh;
  background: blue;
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

function Content3() {
  return (
    <>
      <h2>Content</h2>
      <Box3 />
    </>
  )
}
