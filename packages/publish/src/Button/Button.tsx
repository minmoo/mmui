import { ReactNode, FC } from 'react'

interface ButtonProps {
  children: ReactNode
  onClick: () => void
}

export const PublishButton: FC<ButtonProps> = ({ children, onClick }) => {
  return <button onClick={onClick}>{children}</button>
}
