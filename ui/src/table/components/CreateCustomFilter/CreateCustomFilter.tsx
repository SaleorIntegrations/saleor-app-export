import React, { useState } from 'react'
import { Box, Typography, TextField } from '@material-ui/core'

import { SurfaceModal } from '../../../common/components/SurfaceModal'
import { useTabs } from '../../hooks'

type SetIsOpen = (isOpen: boolean) => void

interface CreateCustomFilterProps {
  isOpen: boolean
  setIsOpen: SetIsOpen
}

export function CreateCustomFilter(props: CreateCustomFilterProps) {
  const { isOpen, setIsOpen } = props
  const { addTab, setCurrentTab, currentTab } = useTabs()
  const [name, setName] = useState('')
  const [error, setError] = useState({
    isActive: false,
    message: '',
  })

  const onCreate = () => {
    const tab = {
      key: name.toUpperCase().replaceAll(' ', '_'),
      title: name,
      filter: currentTab.filter,
    }
    try {
      addTab(tab)
      setCurrentTab(tab.key)

      onClose()
    } catch (fail) {
      const onCreateError = fail as any
      setError({
        isActive: true,
        message: onCreateError.message as string,
      })
    }
  }

  const onClose = () => {
    setName('')
    setIsOpen(false)
    setError({
      isActive: false,
      message: '',
    })
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
