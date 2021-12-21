import React from 'react'
import { Typography } from '@material-ui/core'

import Surface from '../Surface'
import SharingBox from '../SharingBox'
import ScheduleBox from '../ScheduleBox'

export function ActionsContainer() {
  return (
    <Surface>
      <Typography variant="h6">Schedule & Sharing</Typography>
      <ScheduleBox />
      <SharingBox />
    </Surface>
  )
}

export default ActionsContainer
