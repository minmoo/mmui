import { ReactNode, useEffect, useState } from 'react'

import { Body } from './Body'
import { DefaultOptions } from './config/options'
import { Dimmed } from './Dimmed'

interface LayoutProps {
  children: ReactNode
  open: boolean
  onClose: (value: unknown) => Promise<void>
  options: DefaultOptions
}

export const Layout = ({ children, open, onClose, options }: LayoutProps) => {
  const [mount, setMount] = useState(false)
  const { dimmedType, scrollLockElement, ...others } = options

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
      {dimmedType !== 'hide' && (
        <Dimmed
          onClose={onClose}
          scrollLockElement={scrollLockElement}
          type={dimmedType}
        />
      )}
      <Body open={open} setMount={setMount} options={others}>
        {children}
      </Body>
    </>
  )
}
