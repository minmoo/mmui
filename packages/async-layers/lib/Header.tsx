import styled from '@emotion/styled'
import { RefObject } from 'react'
import { useDrag } from './hooks/useDrag'
import { DragOptions } from './config/options'

const Wrapper = styled.div`
  height: 48px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  position: relative;
  padding-top: 16px;
  padding-bottom: 4px;
`

const Handle = styled.div`
  width: 32px;
  height: 4px;
  border-radius: 2px;
  background-color: #d0d0d0;
  margin: auto;
`

interface HeaderProps {
  wrapperRef: RefObject<HTMLElement>
  dragOptions: DragOptions
}

export const Header = ({ wrapperRef, dragOptions }: HeaderProps) => {
  useDrag(wrapperRef, dragOptions)

  return (
    <Wrapper>
      <Handle />
    </Wrapper>
  )
}
