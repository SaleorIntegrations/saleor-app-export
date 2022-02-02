import React, { useEffect, useState } from 'react'
import { Box } from '@material-ui/core'
import { produce } from 'immer'

import { useQueryStaffUsers } from '../../api/saleor/query'
import CheckboxList, { CheckboxListOption } from '../CheckboxList'
import { useCurrentUserStore, useExportCommonStore } from '../../hooks'
import { SearchInput } from '../SearchInput'

type Navigation = {
  endCursor: null | string
  hasNext: boolean
}

export function RecipientsList() {
  const [users] = useExportCommonStore(state => [state.recipients.users])
  const [search, setSearch] = useState('')
  const currentUserId = useCurrentUserStore(state => state.user.id)
  const [staff, setStaff] = useState<CheckboxListOption[]>([])
  const [navigation, setNavigation] = useState<Navigation>({
    endCursor: null,
    hasNext: true,
  })
  const [fetchedStaff, refetchStaffUsers] = useQueryStaffUsers(
    { first: 100, after: navigation.endCursor },
    { pause: true }
  )

  useEffect(() => {
    if (fetchedStaff.data) {
      const { edges, pageInfo } = fetchedStaff.data.staffUsers
      setStaff([
        ...staff,
        ...edges
          .map(({ node }) => ({
            id: node.id,
            name: node.firstName
              ? `${node.firstName} ${node.lastName}`
              : node.email,
            value: node.id,
            checked: users.includes(node.id),
          }))
          .filter(option => option.id !== currentUserId),
      ])

      setNavigation(
        produce(draft => {
          draft.endCursor = pageInfo.endCursor
          draft.hasNext = pageInfo.hasNextPage
        })
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchedStaff.data])

  useEffect(() => {
    if (navigation.hasNext) {
      refetchStaffUsers()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation])

  return (
    <Box>
      <Box margin="1.2rem 0">
        <SearchInput
          onChange={event => setSearch(event.target.value)}
          value={search}
        />
      </Box>
      <CheckboxList
        options={staff}
        mainCheckboxTitle="Select all recipients"
        subCheckboxTitle="Send the report to all recipients"
        setOptions={setStaff}
        filter={option => option.name.includes(search)}
      />
    </Box>
  )
}

export default RecipientsList
