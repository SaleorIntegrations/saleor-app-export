import React, { useState } from 'react'
import {
  Checkbox,
  Box,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from '@material-ui/core'
import { ToggleButtonGroup } from '@material-ui/lab'

import DateField, { Format } from '../../../../common/components/DateField'
import Label from '../../../../common/components/Label'
import { exportFrequency, getLocalOffset, getOffset } from '../../utils'
import date from '../../../../common/utils/date'
import { TimezoneEnum, ExportFrequency } from '../../../../globalTypes'

import useStyle from './style'
import ZoneToggle from './ZoneToggle'

export function Schedule() {
  const classes = useStyle()
  const [isExtended, setIsExtended] = useState(false)
  // TODO: set all by store
  const [zone, setZone] = useState<TimezoneEnum>(TimezoneEnum.UTC)
  const [selectedDate, setSelectedDate] = useState(date().format(Format.date))
  const [selectedTime, setSelectedTime] = useState(date().format(Format.time))
  const [frequency, setFrequency] = useState<ExportFrequency>(
    ExportFrequency.DAILY
  )
  const [startToday, setStartToday] = useState(false)

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
            <Select
              value={frequency}
              onChange={({ target: { value } }) =>
                setFrequency(value as ExportFrequency)
              }
            >
              {exportFrequency.map(({ value, name }) => (
                <MenuItem key={value} value={value}>
                  <Typography>{name}</Typography>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={(_, checked) => setStartToday(checked)}
                  value={startToday}
                />
              }
              label="Start today"
            />
          </FormControl>
          <FormControl fullWidth>
            <ToggleButtonGroup
              className={classes.zoneForm}
              exclusive
              value={zone}
              onChange={(_, newZone) => {
                setZone(newZone)
              }}
            >
              <ZoneToggle
                className={classes.zoneToggle}
                value={TimezoneEnum.LOCAL}
                aria-label="local timezone"
              >
                <Box>
                  <Typography variant="button">Local</Typography>
                  <Typography variant="caption">
                    UTC {getLocalOffset()}
                  </Typography>
                </Box>
              </ZoneToggle>
              <ZoneToggle
                className={classes.zoneToggle}
                value={TimezoneEnum.CHANNEL}
                aria-label="channel timezone"
              >
                {/* TODO: change timezone to dynamical */}
                <Box>
                  <Typography variant="button">Channel</Typography>
                  <Typography variant="caption">
                    UTC {getOffset('America/Denver')}
                  </Typography>
                </Box>
              </ZoneToggle>
              <ZoneToggle
                className={classes.zoneToggle}
                value={TimezoneEnum.UTC}
                aria-label="utc"
              >
                <Typography variant="button">UTC</Typography>
              </ZoneToggle>
            </ToggleButtonGroup>
          </FormControl>
          <DateField
            defaultDate={date().toDate()}
            defaultTime={date().toDate()}
            date={selectedDate}
            time={selectedTime}
            setDate={setSelectedDate}
            setTime={setSelectedTime}
          />
        </>
      )}
    </Box>
  )
}

export default Schedule
