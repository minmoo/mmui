import { ReactNode, useEffect, useState } from 'react'

import { Body } from './Body'
import { Options } from './config/options'
import { Dimmed } from './Dimmed'

interface LayoutProps {
  children: ReactNode
  open: boolean
  onClose: (value: unknown) => void
  options: Options
}

export const Layout = ({ children, open, onClose, options }: LayoutProps) => {
  const [mount, setMount] = useState(false)

  useEffect(() => {
    if (open) {
      setMount(true)
    }
  }, [open])

  if (!mount) {
    return null
  }

  return (
    <>
      {options.dimmed && (
        <Dimmed
          onClose={onClose}
          scrollLockElement={options.scrollLockElement}
        />
      )}
      <Body
        open={open}
        setMount={setMount}
        delay={options.transitionDelay}
        draggable={options.draggable}
        dragOptions={options.dragOptions}
      >
        {children}
      </Body>
    </>
  )
}
