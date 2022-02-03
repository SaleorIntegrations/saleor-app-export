import React, { useMemo } from 'react'
import { Skeleton } from '@material-ui/lab'

interface BasicSkeletonProps {
  isLoaded: boolean
  children: React.ReactNode
  repeat?: number
  height?: string | number
  width?: string | number
}

export function BasicSkeleton(props: BasicSkeletonProps) {
  const { height, width, isLoaded, children, repeat } = props
  const skeletons = useMemo(
    () =>
      Array(repeat || 1)
        .fill(0)
        .map((_, index) => (
          <Skeleton
            height={height}
            width={width}
            key={`skeleton-${index}-${Math.floor(
              100000 + Math.random() * 900000
            )}`}
          />
        )),
    [repeat]
  )

  if (!isLoaded) return <>{skeletons}</>

  return <>{children}</>
}

export default BasicSkeleton
