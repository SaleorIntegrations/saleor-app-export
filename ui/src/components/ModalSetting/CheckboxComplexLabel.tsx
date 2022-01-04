import React from 'react'
import { Typography, Box } from '@material-ui/core'

interface CheckboxComplexLabelProps {
  main: string
  sub?: string
}

export function CheckboxComplexLabel(props: CheckboxComplexLabelProps) {
  const { main, sub } = props

  return (
    <Box>
      <Typography>{main}</Typography>
      <Typography variant="caption">{sub}</Typography>
    </Box>
  )
}

export default CheckboxComplexLabel
