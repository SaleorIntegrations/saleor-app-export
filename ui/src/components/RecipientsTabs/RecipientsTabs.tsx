import React, { useEffect, useState } from 'react'
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
  const [fetchedRecipients, setFetchedRecipients] = useState<FetchOptions>({
    hasNext: true,
    endCursor: '',
    fetchedOptions: [],
  })
  const [fetchedGroups, setFetchedGroups] = useState<FetchOptions>({
    hasNext: true,
    endCursor: '',
    fetchedOptions: [],
  })
  const [tab, setTab] = useState<TabPage>(TabPage.USER)

  const onSave = () => {
    setRecipients(
      produce(recipients, draft => {
        draft.users = fetchedRecipients.fetchedOptions
          .filter(option => option.checked)
          .map(option => option.id)
        draft.permissionGroups = fetchedGroups.fetchedOptions
          .filter(option => option.checked)
          .map(option => option.id)
      })
    )
    setIsOpen(false)
  }

  useEffect(() => {
    setFetchedGroups(
      produce(draft => {
        for (const index in draft.fetchedOptions) {
          const id = draft.fetchedOptions[index].id
          draft.fetchedOptions[index].checked =
            recipients.permissionGroups.includes(id)
        }
      })
    )
    setFetchedRecipients(
      produce(draft => {
        for (const index in draft.fetchedOptions) {
          const id = draft.fetchedOptions[index].id
          draft.fetchedOptions[index].checked = recipients.users.includes(id)
        }
      })
    )
  }, [recipients])

  return (
    <SurfaceModal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      onSave={onSave}
    >
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
          setFetchedOptions={setFetchedRecipients}
        />
      ) : (
        <PermissionGroupsList
          fetchedOptions={fetchedGroups}
          setFetchedOptions={setFetchedGroups}
        />
      )}
    </SurfaceModal>
  )
}

export default RecipientsTabs
