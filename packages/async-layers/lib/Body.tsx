import styled from '@emotion/styled'
import { ReactNode, useEffect, useRef } from 'react'
import _ from 'underscore'
import { Header } from './Header'
import { DragOptions } from './config/options'
import { css } from '@emotion/react'

const Wrapper = styled.div<{ delay: number; height?: number }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: 100%;

  /* DRAG 용*/
  ${({ height = 0 }) =>
    height > 0 &&
    css`
      height: ${height}px;
    `}

  position: fixed;
  z-index: 100;
  bottom: 0;

  background-color: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.6);

  /* 밑으로 보낸다 */
  transform: translateY(100%);
  transition: transform ${({ delay }) => `${delay}ms`} ease-out;
  will-change: transform;
`

const Content = styled.div`
  /* content안에서 scroll을 만드는게 더 낫다 */
  overflow: hidden;
  -webkit-overflow-scrolling: touch;
  padding-bottom: calc(constant(safe-area-inset-bottom));
  padding-bottom: calc(env(safe-area-inset-bottom));
`

interface BodyProps {
  children: ReactNode
  open: boolean
  setMount: (mount: boolean) => void
  delay: number
  draggable: boolean
  dragOptions: DragOptions
}

export const Body = ({
  children,
  open,
  setMount,
  delay,
  draggable,
  dragOptions,
}: BodyProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null)

  const handleTransitionEnd = () => {
    if (!open) {
      setMount(false)
    }
  }

  useEffect(() => {
    // Unmount
    if (!open && wrapperRef.current) {
      wrapperRef.current.style.transform = 'translate3d(0, 100%, 0)'
    }
  }, [open])

  useEffect(() => {
    // Mount
    _.delay(() => {
      if (wrapperRef.current) {
        const translateY = draggable
          ? window.innerHeight - dragOptions.minHeight
          : 0

        wrapperRef.current.style.transform = `translateY(${translateY}px)`
      }
    })
  }, [])

  return (
    <Wrapper
      ref={wrapperRef}
      onTransitionEnd={handleTransitionEnd}
      delay={delay}
      height={
        'innerHeight' in window && draggable
          ? window.innerHeight - dragOptions.minY
          : 0
      }
    >
      {draggable && (
        <Header wrapperRef={wrapperRef} dragOptions={dragOptions} />
      )}
      <Content>{children}</Content>
    </Wrapper>
  )
}
