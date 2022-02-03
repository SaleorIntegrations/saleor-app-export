import React, { useState } from 'react'
import { Tab, Tabs, Typography } from '@material-ui/core'
import { produce } from 'immer'

import { PermissionGroupsList } from '../PermissionGroupsList'
import { RecipientsList } from '../RecipientsList'
import { SurfaceModal } from '../SurfaceModal'

import { useStyles } from './styles'
import { useExportCommonStore } from '../../hooks'
import { CheckboxListOption } from '../CheckboxList'

enum TabPage {
  GROUP = 'GROUP',
  USER = 'USER',
}

export interface FetchOptions {
  hasNext: boolean
  endCursor: string | null
  fetchedOptions: CheckboxListOption[]
}

interface RecipientsTabsProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export function RecipientsTabs(props: RecipientsTabsProps) {
  const { isOpen, setIsOpen } = props
  const classes = useStyles()
  const [recipients, setRecipients] = useExportCommonStore(state => [
    state.recipients,
    state.setRecipients,
  ])
  const [fetchedRecipients, setFetchRecipients] = useState<FetchOptions>({
    hasNext: true,
    endCursor: '',
    fetchedOptions: [],
  })
  const [groupOptions, setGroupOptions] = useState<CheckboxListOption[]>([])
  const [tab, setTab] = useState<TabPage>(TabPage.USER)

  const onSave = () => {
    setRecipients(
      produce(recipients, draft => {
        draft.users = fetchedRecipients.fetchedOptions
          .filter(option => option.checked)
          .map(option => option.id)
        draft.permissionGroups = groupOptions
          .filter(option => option.checked)
          .map(option => option.id)
      })
    )
    setIsOpen(false)
    setGroupOptions([])
  }

  const onClose = () => {
    setGroupOptions([])
    setIsOpen(false)
  }

  return (
    <SurfaceModal isOpen={isOpen} onClose={onClose} onSave={onSave}>
      <Tabs
        indicatorColor="primary"
        className={classes.tabs}
        variant="fullWidth"
        value={tab}
        onChange={(_, value) => setTab(value)}
      >
        <Tab value={TabPage.USER} fullWidth label="Users" />
        <Tab value={TabPage.GROUP} fullWidth label="Groups" />
      </Tabs>
      <Typography variant="h5">
        Select {tab === TabPage.USER ? 'Recipients' : 'Groups'}
      </Typography>
      {tab === TabPage.USER ? (
        <RecipientsList
          fetchedOptions={fetchedRecipients}
          setFetchedOptions={setFetchRecipients}
        />
      ) : (
        <PermissionGroupsList />
      )}
    </SurfaceModal>
  )
}

export default RecipientsTabs
