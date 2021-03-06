import React, { useEffect, useState } from 'react'
import { Box } from '@material-ui/core'
import { produce } from 'immer'

import CheckboxList from '../../../../common/components/CheckboxList'
import { SearchInput } from '../../../../common/components/SearchInput'
import { FetchOptions } from '../RecipientsTabs'
import { CheckboxListOption } from '../../../../common/components/CheckboxList'
import { BasicSkeleton } from '../../../../common/components/BasicSkeleton'
import { useFutherCommon, useCurrentUser } from '../../../../common'
import { useQueryStaffUsers } from '../../api'

interface RecipientsListProps {
  fetchedOptions: FetchOptions
  setFetchedOptions: (fetchOptions: FetchOptions) => void
}

export function RecipientsList(props: RecipientsListProps) {
  const { fetchedOptions, setFetchedOptions } = props
  const users = useFutherCommon(state => state.recipients.users)
  const [search, setSearch] = useState('')
  const currentUserId = useCurrentUser(state => state.user.id)
  const [fetchedStaff, refetchStaffUsers] = useQueryStaffUsers(
    {
      first: 25,
      after: fetchedOptions.endCursor,
      ids: [],
    },
    { pause: true }
  )

  const setRecipients = (recipients: CheckboxListOption[]) => {
    setFetchedOptions(
      produce(fetchedOptions, draft => {
        draft.fetchedOptions = recipients
      })
    )
  }

  useEffect(() => {
    if (fetchedStaff.data) {
      const {
        edges,
        pageInfo: { hasNextPage, endCursor },
      } = fetchedStaff.data.staffUsers
      setFetchedOptions(
        produce(fetchedOptions, draft => {
          draft.fetchedOptions = draft.fetchedOptions.concat(
            edges
              .map(({ node }) => ({
                id: node.id,
                name: node.firstName
                  ? `${node.firstName} ${node.lastName}`
                  : node.email,
                value: node.id,
                checked: users.includes(node.id),
              }))
              .filter(option => option.id !== currentUserId)
          )

          draft.endCursor = endCursor
          draft.hasNext = hasNextPage
        })
      )
    }
  }, [fetchedStaff.data])

  useEffect(() => {
    if (fetchedOptions.hasNext) refetchStaffUsers()
  }, [fetchedOptions.endCursor])

  return (
    <Box>
      <Box margin="1.2rem 0">
        <SearchInput
          onChange={event => setSearch(event.target.value)}
          value={search}
        />
      </Box>
      <BasicSkeleton
        isLoaded={!fetchedOptions.hasNext && !fetchedStaff.fetching}
        height={80}
        repeat={10}
      >
        <CheckboxList
          options={fetchedOptions.fetchedOptions}
          mainCheckboxTitle="Select all recipients"
          subCheckboxTitle="Send the report to all recipients"
          setOptions={setRecipients}
          filter={option =>
            option.name.toLowerCase().includes(search.toLowerCase())
          }
        />
      </BasicSkeleton>
    </Box>
  )
}

export default RecipientsList
