import { createContext, createElement, useMemo } from 'react'
import type { IconConfigProviderContext } from './interface'

interface IconConfigProviderProps extends IconConfigProviderContext {
  children?: React.ReactNode
}

export const iconConfigProviderContext = createContext<IconConfigProviderContext | undefined>(undefined)

const { Provider } = iconConfigProviderContext

export function IconConfigProvider ({
  color,
  size,
  tag,
  children
}: IconConfigProviderProps) {
  // cache children for better perf
  const childrenNode = useMemo(() => children, [
    children, color, size, tag
  ])
  return createElement(Provider, {
    value: {
      color,
      size,
      tag
    }
  }, childrenNode)
}