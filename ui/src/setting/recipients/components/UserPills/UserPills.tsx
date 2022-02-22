import React, { useEffect } from 'react'
import { produce } from 'immer'

import { useCurrentUserStore, useExportCommonStore } from '../../../../common'
import { useQueryStaffUsers } from '../../../../api/saleor/query'
import { PillsSkeleton } from '../../../../common/components/PillsSkeleton'
import { Pill } from '../../../../common/components/Pill'

export function UserPills() {
  const userId = useCurrentUserStore(state => state.user.id)
  const { setRecipients, recipients } = useExportCommonStore(state => ({
    recipients: state.recipients,
    setRecipients: state.setRecipients,
  }))
  const [fetchedUsers, refetchUsers] = useQueryStaffUsers(
    {
      first: 5,
      ids: recipients.users.filter(id => id !== userId),
    },
    { pause: true }
  )

  const onDelete = (recipientId: string) => {
    setRecipients(
      produce(recipients, draft => {
        draft.users = draft.users.filter(userId => userId !== recipientId)
      })
    )
  }

  useEffect(() => {
    refetchUsers()
  }, [recipients.users])

  if (recipients.users.length <= 1) return null

  return (
    <PillsSkeleton isLoaded={!fetchedUsers.fetching} repeat={2}>
      {fetchedUsers.data &&
        fetchedUsers.data.staffUsers.edges.map(({ node }) => (
          <Pill
            key={node.id}
            onClick={() => onDelete(node.id)}
            label={`${node.firstName} ${node.lastName}`}
            onDelete={() => onDelete(node.id)}
          />
        ))}
    </PillsSkeleton>
  )
}

export default UserPills
