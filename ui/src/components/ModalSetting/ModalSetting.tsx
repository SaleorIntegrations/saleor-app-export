import React from 'react'
import {
  Paper,
  Box,
  Typography,
  FormControl,
  FormControlLabel,
  Checkbox,
  Button,
} from '@material-ui/core'

import useStyles from './styles'
import ComplexLabel from '../InputComplexLabel'

export type Action = 'ADD' | 'REMOVE'

export interface ModalOption {
  id: string
  slug: string
  type: string
  value: string
  checked: boolean
  name: string
}

export interface ModalSettingProps {
  search?: React.ReactNode
  options: ModalOption[]
  filteredOptions: ModalOption[]
  title: string
  subtitle: string
  checkboxTitle: string
  checkboxSubtitle?: string
  onAllCheck: (checked: boolean) => void
  onSubCheck: (id: string, action: Action) => void
  additionalSelect?: React.ReactNode
  onExit: () => void
  onSubmit: () => void
}

export function ModalSetting(props: ModalSettingProps) {
  const {
    search,
    options,
    title,
    subtitle,
    checkboxTitle,
    checkboxSubtitle,
    additionalSelect,
    onAllCheck,
    onSubCheck,
    onExit,
    onSubmit,
    filteredOptions,
  } = props
  const classes = useStyles()

  const onSubCheckboxChange = (
    _event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    if (checked) {
      onSubCheck(_event.target.value, 'ADD')
    } else {
      onSubCheck(_event.target.value, 'REMOVE')
    }
  }

  const onAllCheckboxChange = (
    _event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    onAllCheck(checked)
  }

  return (
    <Box>
      <Paper className={classes.modal}>
        <Typography variant="h5">{title}</Typography>
        <Typography>{subtitle}</Typography>
        <Box margin="1.2rem 0">{search}</Box>
        <Box>
          <FormControlLabel
            label={<ComplexLabel main={checkboxTitle} sub={checkboxSubtitle} />}
            control={
              <Checkbox
                checked={options.every(option => option.checked)}
                onChange={onAllCheckboxChange}
              />
            }
          />
          <Box>
            {filteredOptions.map(option => (
              <FormControl key={option.id} className={classes.checkSlot}>
                <FormControlLabel
                  label={option.name}
                  control={
                    <Checkbox
                      checked={option.checked}
                      value={option.value}
                      onChange={onSubCheckboxChange}
                    />
                  }
                />
              </FormControl>
            ))}
          </Box>
          {additionalSelect}
        </Box>
        <Box className={classes.buttonBox}>
          <Button variant="outlined" onClick={onExit}>
            Cancel
          </Button>
          <Button color="primary" variant="contained" onClick={onSubmit}>
            Select
          </Button>
        </Box>
      </Paper>
    </Box>
  )
}

export default ModalSetting
