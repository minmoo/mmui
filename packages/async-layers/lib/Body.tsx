import styled from '@emotion/styled'
import { ReactNode, useEffect, useRef } from 'react'
import _ from 'underscore'
// import { MAX_HEIGHT, MIN_Y } from "../lib/useDrag2";
// import { BottomSheetHeader } from "./Header";

/* DRAG 용*/
/* 
  height: ${MAX_HEIGHT}px; 
  */

//TODO height 추가되어야 한다 동적으로
const Wrapper = styled.div<{ delay: number }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: 100%;

  position: fixed;
  z-index: 1;
  bottom: 0;
  /* 
  border-top-left-radius: 8px;
  border-top-right-radius: 8px; */
  background-color: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.6);

  /* 밑으로 보낸다 */
  transform: translateY(100%);
  transition: transform ${({ delay }) => `${delay}ms`} ease-out;
  will-change: transform;
`

const BottomSheetContent = styled.div`
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
}

export const Body = ({ children, open, setMount, delay }: BodyProps) => {
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
        wrapperRef.current.style.transform = 'translateY(0)'
        // wrapperRef.current.style.transform = `translateY(${MIN_Y}px)`;
      }
    })
  }, [])

  return (
    <Wrapper
      ref={wrapperRef}
      onTransitionEnd={handleTransitionEnd}
      delay={delay}
    >
      {/* <BottomSheetHeader wrapperRef={wrapperRef} /> */}
      <BottomSheetContent>{children}</BottomSheetContent>
    </Wrapper>
  )
}
