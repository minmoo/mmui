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
  const { dimmed, scrollLockElement, ...others } = options

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
      {dimmed && (
        <Dimmed onClose={onClose} scrollLockElement={scrollLockElement} />
      )}
      <Body open={open} setMount={setMount} options={others}>
        {children}
      </Body>
    </>
  )
}
