import styled from '@emotion/styled'
import { useEffect } from 'react'
import { lockScroll, unlockScroll } from './util/scrollLock'

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #484848;
  z-index: 100;
  opacity: 0.3;

  animation: show 225ms cubic-bezier(0.4, 0, 0.2, 1);

  @keyframes show {
    from {
      opacity: 0;
    }
    to {
      opacity: 0.3;
    }
  }
`

interface DimmedProps {
  onClose: (value: unknown) => void
  scrollLockElement: HTMLElement | null
}

export const Dimmed = ({ onClose, scrollLockElement }: DimmedProps) => {
  const handleClick = () => {
    onClose('dimmed')
  }

  useEffect(() => {
    lockScroll(scrollLockElement)
    return () => {
      unlockScroll(scrollLockElement)
    }
  }, [])

  return <Container onClick={handleClick} />
}
