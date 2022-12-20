import styled from '@emotion/styled'
import { ReactNode } from 'react'
import { Options } from './config/options'
import { Dimmed } from './Dimmed'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: rgb(0 0 0 / 20%) 0px 11px 15px -7px,
    rgb(0 0 0 / 14%) 0px 24px 38px 3px, rgb(0 0 0 / 12%) 0px 9px 46px 8px;
  z-index: 100;
`

interface DialogProps {
  children: ReactNode
  options: Options
  open: boolean
  onClose: (value: unknown) => void
}

export const Dialog = ({ children, open, options, onClose }: DialogProps) => {
  if (!open) return null

  return (
    <>
      {options.dimmed && (
        <Dimmed
          onClose={onClose}
          scrollLockElement={options.scrollLockElement}
        />
      )}
      <Wrapper>{children}</Wrapper>
    </>
  )
}
