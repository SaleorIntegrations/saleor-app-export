import React, { useEffect } from 'react'
import { produce } from 'immer'

import { PillsSkeleton } from '../../../../common/components/PillsSkeleton'
import { Pill } from '../../../../common/components/Pill'
import { useFutherCommon } from '../../../../common'
import { useQueryPermissionGroups } from '../../api'

export function RecipientGroupPills() {
  const { setRecipients, recipients } = useFutherCommon(state => ({
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
  const allowToDisplay = 5 - (recipients.users.length - 1)

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

  if (allowToDisplay < 1 || recipients.permissionGroups.length < 1) return null

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
