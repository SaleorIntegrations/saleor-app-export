import React, { useState } from 'react'
import {
  Checkbox,
  Box,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Typography,
  TextField,
} from '@material-ui/core'
import moment from 'moment'
import { ToggleButtonGroup } from '@material-ui/lab'

import Label from '../Label'
import useStyle from './style'
import ZoneToggle from './ZoneToggle'

export function ScheduleBox() {
  const classes = useStyle()
  const [isExtended, setIsExtended] = useState(false)
  const [zone, setZone] = useState('utc')
  const [selectedDate, setSelectedDate] = useState(moment())
  const [selectedTime, setSelectedTime] = useState(moment())

  return (
    <Box>
      <Label>SCHEDULE</Label>
      <FormControl>
        <FormControlLabel
          control={
            <Checkbox
              checked={isExtended}
              onChange={e => setIsExtended(e.target.checked)}
            />
          }
          label="Email report periodically"
        />
      </FormControl>
      {isExtended && (
        <>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Export frequency</InputLabel>
            <Select>
              <MenuItem value="local">
                <Typography>Local</Typography>
              </MenuItem>
              <MenuItem value="channel">
                <Typography>Channel</Typography>
              </MenuItem>
              <MenuItem value="utc">
                <Typography>UTC</Typography>
              </MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <FormControlLabel control={<Checkbox />} label="Start today" />
          </FormControl>
          <FormControl fullWidth>
            <Paper className={classes.zonePaper}>
              <ToggleButtonGroup
                style={{ width: '100%' }}
                exclusive
                value={zone}
                onChange={(e, newZone) => {
                  setZone(newZone)
                }}
              >
                <ZoneToggle
                  className={classes.zoneToggle}
                  value="local"
                  aria-label="a"
                >
                  <Box>
                    <Typography variant="button">Local</Typography>
                    <Typography variant="caption">UTC +4</Typography>
                  </Box>
                </ZoneToggle>
                <ZoneToggle
                  className={classes.zoneToggle}
                  value="channel"
                  aria-label="b"
                >
                  <Box>
                    <Typography variant="button">Channel</Typography>
                    <Typography variant="caption">UTC +2</Typography>
                  </Box>
                </ZoneToggle>
                <ZoneToggle
                  className={classes.zoneToggle}
                  value="utc"
                  aria-label="c"
                >
                  <Typography variant="button">UTC</Typography>
                </ZoneToggle>
              </ToggleButtonGroup>
            </Paper>
          </FormControl>
          <Box className={classes.dateBox}>
            <TextField
              className={classes.date}
              type="date"
              label="Date"
              defaultValue={moment().format('yyyy-MM-DD')}
              onChange={e =>
                setSelectedDate(moment(new Date(e.currentTarget.value)))
              }
            />
            <TextField
              className={classes.time}
              type="time"
              label="Time"
              defaultValue={moment().format('HH:mm')}
              onChange={e =>
                setSelectedTime(moment(new Date(e.currentTarget.value)))
              }
            />
          </Box>
        </>
      )}
    </Box>
  )
}

export default ScheduleBox
