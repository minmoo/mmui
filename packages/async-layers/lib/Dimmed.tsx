import styled from '@emotion/styled'
import { useEffect } from 'react'
import { CLOSE_TYPE, DimmedType } from './config/options'
import { lockScroll, unlockScroll } from './util/scrollLock'
import { useLayersUtils } from './hooks/useLayers'
import _ from 'underscore'

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
  onClose: (value: unknown) => Promise<void>
  scrollLockElement: HTMLElement | null
  type: DimmedType
}

export const Dimmed = ({ onClose, scrollLockElement, type }: DimmedProps) => {
  const { getOpenLayers } = useLayersUtils()
  const handleClick = () => {
    if (type === 'closeable') {
      onClose(CLOSE_TYPE.DIMMED)
    }
  }

  useEffect(() => {
    lockScroll(scrollLockElement)
    return () => {
      const openDimmedLayers = _.filter(
        getOpenLayers(),
        (layer) => layer[1].options.dimmedType !== 'hide',
      )
      if (openDimmedLayers.length === 0) {
        unlockScroll(scrollLockElement)
      }
    }
  }, [])

  return <Container onClick={handleClick} />
}
