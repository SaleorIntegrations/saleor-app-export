import React from 'react'
import { Typography, Box } from '@material-ui/core'

interface InputComplexLabelProps {
  main: string
  sub?: string
}

export function InputComplexLabel(props: InputComplexLabelProps) {
  const { main, sub } = props

  return (
    <Box>
      <Typography>{main}</Typography>
      <Typography variant="caption">{sub}</Typography>
    </Box>
  )
}

export default InputComplexLabel
