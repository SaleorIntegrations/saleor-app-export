import React, { useEffect, useState, useMemo } from 'react'
import { Tab, Tabs, Typography } from '@material-ui/core'
import { produce } from 'immer'

import { PermissionGroupsList } from '../PermissionGroupsList'
import { RecipientsList } from '../RecipientsList'
import { SurfaceModal } from '../../../../common/components/SurfaceModal'

import { useStyles } from './styles'
import { CheckboxListOption } from '../../../../common/components/CheckboxList'
import { useExportCommonStore } from '../../../../common'

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
  const unfetchedGroups = useMemo(
    () =>
      recipients.permissionGroups.filter(
        groupId =>
          !fetchedGroups.fetchedOptions.find(option => option.id === groupId)
      ),
    [recipients.permissionGroups, fetchedGroups.fetchedOptions]
  )
  const unfetchedUsers = useMemo(
    () =>
      recipients.users.filter(
        userId =>
          !fetchedRecipients.fetchedOptions.find(option => option.id === userId)
      ),
    [recipients.users, fetchedGroups.fetchedOptions]
  )

  const onSave = () => {
    setRecipients(
      produce(recipients, draft => {
        const users = new Set(
          fetchedRecipients.fetchedOptions
            .filter(option => option.checked)
            .map(option => option.id)
            .concat(unfetchedUsers)
        )
        const groups = new Set(
          fetchedGroups.fetchedOptions
            .filter(option => option.checked)
            .map(option => option.id)
            .concat(unfetchedGroups)
        )
        draft.users = [...users]
        draft.permissionGroups = [...groups]
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
