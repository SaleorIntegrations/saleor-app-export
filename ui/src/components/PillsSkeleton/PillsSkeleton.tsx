import React, { useMemo } from 'react'
import { Skeleton } from '@material-ui/lab'
import { Box } from '@material-ui/core'

interface PillsSkeletonProps {
  children: React.ReactNode
  isLoaded: boolean
  repeat: number
}

export function PillsSkeleton(props: PillsSkeletonProps) {
  const { children, isLoaded, repeat } = props
  const skeletons = useMemo(
    () =>
      Array(repeat || 1)
        .fill(0)
        .map((_, index) => (
          <Box
            m={0.5}
            key={`skeleton-${index}-${Math.floor(
              100000 + Math.random() * 900000
            )}`}
          >
            <Skeleton variant="rect" height={32} width={120} />
          </Box>
        )),
    [repeat]
  )

  if (!isLoaded)
    return (
      <Box display="flex" flexWrap="wrap">
        {skeletons}
      </Box>
    )

  return <>{children}</>
}

export default PillsSkeleton
