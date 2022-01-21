import React from 'react'
import { Paper, Box, Typography, Button } from '@material-ui/core'

import useStyles from './styles'
import CheckboxList, { CheckboxListOption } from '../CheckboxList'

export type Action = 'ADD' | 'REMOVE'
export interface ModalOption extends CheckboxListOption {}

export interface ModalSettingProps {
  search?: React.ReactNode
  options: ModalOption[]
  setOptions: React.SetStateAction<any>
  title: string
  subtitle: string
  filter: (option: ModalOption) => boolean
  checkboxTitle: string
  checkboxSubtitle?: string
  additionalSelect?: React.ReactNode
  onExit: () => void
  onSubmit: () => void
}

export function ModalSetting(props: ModalSettingProps) {
  const {
    search,
    options,
    setOptions,
    title,
    subtitle,
    filter,
    checkboxTitle,
    checkboxSubtitle,
    additionalSelect,
    onExit,
    onSubmit,
  } = props
  const classes = useStyles()

  return (
    <Box>
      <Paper className={classes.modal}>
        <Typography variant="h5">{title}</Typography>
        <Typography>{subtitle}</Typography>
        <Box margin="1.2rem 0">{search}</Box>
        <CheckboxList
          options={options}
          mainCheckboxTitle={checkboxTitle}
          subCheckboxTitle={checkboxSubtitle}
          setOptions={setOptions}
          filter={filter}
        />
        {additionalSelect}
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
