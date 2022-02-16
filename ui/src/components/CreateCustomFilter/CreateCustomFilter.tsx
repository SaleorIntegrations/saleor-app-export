import React, { useState } from 'react'
import { Box, Typography, TextField } from '@material-ui/core'

import { SurfaceModal } from '../SurfaceModal'

type OnSave = () => void
type OnClose = () => void
type SetName = (name: string) => void

interface CreateCustomFilterProps {
  isOpen: boolean
  onSave: OnSave
  onClose: OnClose
  setName: SetName
  name: string
}

export function CreateCustomFilter(props: CreateCustomFilterProps) {
  const { isOpen, onSave, onClose, setName, name } = props
  const [error, setError] = useState({
    isActive: false,
    message: '',
  })

  const onCreate = () => {
    try {
      onSave()
      setError({
        isActive: false,
        message: '',
      })
    } catch (fail) {
      const onCreateError = fail as any
      setError({
        isActive: true,
        message: onCreateError.message as string,
      })
    }
  }

  return (
    <SurfaceModal isOpen={isOpen} onSave={onCreate} onClose={onClose}>
      <Box mb={3}>
        <Typography variant="h5">Save Custom Search</Typography>
      </Box>
      <TextField
        label="New Title"
        error={error.isActive}
        helperText={error.message}
        fullWidth
        value={name}
        onChange={event => setName(event.currentTarget.value)}
      />
    </SurfaceModal>
  )
}

export default CreateCustomFilter
