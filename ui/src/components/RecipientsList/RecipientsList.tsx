import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Box } from '@material-ui/core'
import { produce } from 'immer'

import { useQueryStaffUsers } from '../../api/saleor/query'
import CheckboxList from '../CheckboxList'
import { useCurrentUserStore, useExportCommonStore } from '../../hooks'
import { SearchInput } from '../SearchInput'
import { FetchOptions } from '../RecipientsTabs'
import { CheckboxListOption } from '../CheckboxList'
import { BasicSkeleton } from '../BasicSkeleton'

interface RecipientsListProps {
  fetchedOptions: FetchOptions
  setFetchedOptions: (fetchOptions: FetchOptions) => void
}

export function RecipientsList(props: RecipientsListProps) {
  const { fetchedOptions, setFetchedOptions } = props
  const users = useExportCommonStore(state => state.recipients.users)
  const [search, setSearch] = useState('')
  const currentUserId = useCurrentUserStore(state => state.user.id)
  const [fetchedStaff, refetchStaffUsers] = useQueryStaffUsers(
    {
      first: 5,
      after: fetchedOptions.endCursor,
      search: search,
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

  useLayoutEffect(() => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchedStaff.data])

  useEffect(() => {
    if (fetchedOptions.hasNext) refetchStaffUsers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
