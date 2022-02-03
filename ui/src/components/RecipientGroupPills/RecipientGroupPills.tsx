import React, { useEffect, useMemo } from 'react'
import { produce } from 'immer'

import { useExportCommonStore } from '../../hooks'
import { useQueryPermissionGroups } from '../../api/saleor/query'
import { PillsSkeleton } from '../../components/PillsSkeleton'
import { Pill } from '../Pill'

export function RecipientGroupPills() {
  const { setRecipients, recipients } = useExportCommonStore(state => ({
    recipients: state.recipients,
    setRecipients: state.setRecipients,
  }))
  const [fetchedGroups, refetchGroups] = useQueryPermissionGroups(
    {
      first: 5,
      ids: recipients.permissionGroups,
    },
    { pause: true }
  )
  const allowToDisplay = useMemo(
    () => 5 - (recipients.users.length - 1),
    [recipients.users]
  )

  const onDelete = (recipientId: string) => {
    setRecipients(
      produce(recipients, draft => {
        draft.permissionGroups = draft.permissionGroups.filter(
          groupId => groupId !== recipientId
        )
      })
    )
  }

  useEffect(() => {
    refetchGroups()
  }, [recipients.permissionGroups])

  if (recipients.permissionGroups.length < 1) return null

  return (
    <PillsSkeleton isLoaded={!fetchedGroups.fetching} repeat={3}>
      {fetchedGroups.data &&
        fetchedGroups.data.permissionGroups.edges
          .slice(0, allowToDisplay)
          .map(({ node }) => (
            <Pill
              key={node.id}
              onClick={() => onDelete(node.id)}
              label={node.name}
              onDelete={() => onDelete(node.id)}
            />
          ))}
    </PillsSkeleton>
  )
}

export default RecipientGroupPills
