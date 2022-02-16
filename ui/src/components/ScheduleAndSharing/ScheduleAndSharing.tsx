import React from 'react'
import { Box, Typography } from '@material-ui/core'

import Recipients from '../Recipients'
import { Schedule } from '../Schedule'
import Surface from '../Surface'

import { useStyles } from './styles'

export function ScheduleAndSharing() {
  const classes = useStyles()

  return (
    <Surface padding={0}>
      <Box padding={3} className={classes.topBox}>
        <Typography style={{ marginBottom: 24 }} variant="h5">
          Schedule & Sharing
        </Typography>
        <Schedule />
      </Box>
      <Box padding={3}>
        <Recipients />
      </Box>
    </Surface>
  )
}

export default ScheduleAndSharing
