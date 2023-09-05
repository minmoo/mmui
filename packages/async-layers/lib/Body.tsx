import styled from '@emotion/styled'
import { ReactNode, useEffect, useRef } from 'react'
import _ from 'underscore'
import { LayerPosition, DefaultOptions } from './config/options'
import { css, SerializedStyles } from '@emotion/react'
import { useDrag } from './hooks/useDrag'

const getTransformText: {
  [key in Exclude<LayerPosition, 'center'>]: {
    show: (height?: number) => string
    hide: string
  }
} = {
  bottom: {
    show: (height = 0) =>
      height > 0 ? `translateY(${height}px)` : 'translateY(0px)',
    hide: 'translateY(100%)',
  },
  top: {
    show: () => 'translateY(0px)',
    hide: 'translateY(-100%)',
  },
  left: {
    show: () => 'translateX(0px)',
    hide: 'translateX(-100%)',
  },
  right: {
    show: () => 'translateX(0px)',
    hide: 'translateX(100%)',
  },
}

const positionStyles: {
  [key in LayerPosition]: (delay: number) => SerializedStyles
} = {
  bottom: (delay) => css`
    bottom: 0;
    transform: translateY(100%);
    transition: transform ${delay}ms ease-out;
    width: 100%;
    will-change: transform;
  `,
  top: (delay) => css`
    top: 0;
    transform: translateY(-100%);
    transition: transform ${delay}ms ease-out;
    width: 100%;
    will-change: transform;
  `,
  left: (delay) => css`
    top: 0;
    left: 0;
    transform: translateX(-100%);
    transition: transform ${delay}ms ease-out;
    height: 100%;
    will-change: transform;
  `,
  right: (delay) => css`
    top: 0;
    right: 0;
    transform: translateX(100%);
    transition: transform ${delay}ms ease-out;
    height: 100%;
    will-change: transform;
  `,
  center: (delay) => css`
    top: 50%;
    left: 50%;
    transition: opacity ${delay}ms cubic-bezier(0.4, 0, 0.2, 1);
    transform: translate(-50%, -50%);
    opacity: 0;
    will-change: opacity;
  `,
}

//TODO draggable 아닐경우 max-height 줘야할듯?
const Wrapper = styled.div<{
  position: LayerPosition
  delay: number
}>`
  position: fixed;

  display: flex;
  flex-direction: column;
  z-index: 100;

  background-color: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.6);
  ${({ position, delay }) => positionStyles[position](delay)};
`

const Content = styled.div<{ draggable: boolean }>`
  /* content안에서 scroll을 만들어야한다. content크기만큼 나온다 */
  overflow: ${({ draggable }) => (draggable ? 'auto' : 'hidden')};
  -webkit-overflow-scrolling: touch;
  padding-bottom: calc(constant(safe-area-inset-bottom));
  padding-bottom: calc(env(safe-area-inset-bottom));
`

interface BodyProps {
  children: ReactNode
  open: boolean
  setMount: (mount: boolean) => void
  options: Omit<DefaultOptions, 'dimmedType' | 'scrollLockElement'>
}

export const Body = ({ children, open, setMount, options }: BodyProps) => {
  const {
    position,
    transitionDelay = 0,
    draggable = false,
    dragOptions,
  } = options

  const wrapperRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useDrag(
    wrapperRef,
    contentRef,
    dragOptions,
    position === 'bottom' && draggable,
  )

  const handleTransitionEnd = () => {
    if (!open) {
      setMount(false)
    }
  }

  useEffect(() => {
    // Unmount
    if (!open && wrapperRef.current) {
      if (position === 'center') {
        wrapperRef.current.style.opacity = '0'
      } else {
        wrapperRef.current.style.transform = getTransformText[position].hide
      }

      //delay없을 경우에는 바로 mount 해지한다.
      if (transitionDelay === 0) {
        setMount(false)
      }
    }
  }, [open])

  useEffect(() => {
    // Mount
    if (wrapperRef.current && draggable) {
      //Draggable일 경우 높이를 고정해준다.
      wrapperRef.current.style.height = `${
        window.innerHeight - dragOptions.minY
      }px`
    }

    _.delay(() => {
      if (wrapperRef.current) {
        if (position === 'center') {
          wrapperRef.current.style.opacity = '1'
        } else {
          wrapperRef.current.style.transform = getTransformText[position].show(
            //position==='bottom' 이면서 draggable일 경우에 올라오는 크기 고정
            draggable
              ? window.innerHeight - dragOptions.minHeight - dragOptions.minY
              : 0,
          )
        }
      }
    })
  }, [])

  return (
    <Wrapper
      ref={wrapperRef}
      position={position}
      delay={transitionDelay}
      onTransitionEnd={handleTransitionEnd}
    >
      <Content draggable={draggable} ref={contentRef}>
        {children}
      </Content>
    </Wrapper>
  )
}
