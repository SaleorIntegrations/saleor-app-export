import React, { useEffect, useState } from 'react'
import { Box } from '@material-ui/core'
import { produce } from 'immer'

import CheckboxList, { CheckboxListOption } from '../CheckboxList'
import { useQueryPermissionGroups } from '../../api/saleor/query'
import { useExportCommonStore } from '../../hooks'
import { SearchInput } from '../SearchInput'
import { FetchOptions } from '../RecipientsTabs'
import { BasicSkeleton } from '../BasicSkeleton'

interface PermissionGroupsListProps {
  fetchedOptions: FetchOptions
  setFetchedOptions: (fetchOptions: FetchOptions) => void
}

export function PermissionGroupsList(props: PermissionGroupsListProps) {
  const { fetchedOptions, setFetchedOptions } = props
  const permissionGroups = useExportCommonStore(
    state => state.recipients.permissionGroups
  )
  const [search, setSearch] = useState('')
  const [fetchedGroups, refetchedGroups] = useQueryPermissionGroups(
    { first: 25, after: fetchedOptions.endCursor, ids: [] },
    { pause: true }
  )

  const setGroups = (groups: CheckboxListOption[]) => {
    setFetchedOptions(
      produce(fetchedOptions, draft => {
        draft.fetchedOptions = groups
      })
    )
  }

  useEffect(() => {
    if (fetchedGroups.data) {
      const {
        edges,
        pageInfo: { hasNextPage, endCursor },
      } = fetchedGroups.data.permissionGroups
      setFetchedOptions(
        produce(fetchedOptions, draft => {
          draft.fetchedOptions = draft.fetchedOptions.concat(
            edges.map(({ node }) => ({
              id: node.id,
              name: node.name,
              value: node.id,
              checked: permissionGroups.includes(node.id),
            }))
          )

          draft.endCursor = endCursor
          draft.hasNext = hasNextPage
        })
      )
    }
  }, [fetchedGroups.data])

  useEffect(() => {
    if (fetchedOptions.hasNext) {
      refetchedGroups()
    }
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
        isLoaded={!fetchedOptions.hasNext && !fetchedGroups.fetching}
        height={80}
        repeat={10}
      >
        <CheckboxList
          options={fetchedOptions.fetchedOptions}
          mainCheckboxTitle="Select all groups"
          subCheckboxTitle="Send the report to all groups"
          setOptions={setGroups}
          filter={option =>
            option.name.toLowerCase().includes(search.toLowerCase())
          }
        />
      </BasicSkeleton>
    </Box>
  )
}

export default PermissionGroupsList
