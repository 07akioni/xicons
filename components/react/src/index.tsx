import * as React from 'react'
import { useEffect, useMemo } from 'react'
import { mountStyle } from './style'

interface IconProps {
  size?: string | number
  color?: string
  tag?: keyof JSX.IntrinsicElements
  children?: React.ReactNode
}

export function Icon ({ size, color, tag = 'span', children }: IconProps) {
  const CustomTag = tag
  const mergedSize = useMemo(() => {
    if (size === undefined) return undefined
    if (typeof size === 'number' || /^\d+$/.test(size)) return `${size}px`
    return size
  }, [size])
  useEffect(() => {
    mountStyle()
  }, [])
  return (
    <CustomTag
      className="xicon"
      style={{
        color: color,
        fontSize: mergedSize
      }}
    >
      {children}
    </CustomTag>
  )
}
