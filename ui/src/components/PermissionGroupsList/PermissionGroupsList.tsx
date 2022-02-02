import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Box } from '@material-ui/core'
import { produce } from 'immer'

import CheckboxList, { CheckboxListOption } from '../CheckboxList'
import { useQueryPermissionGroups } from '../../api/saleor/query'
import { useExportCommonStore } from '../../hooks'
import { SearchInput } from '../SearchInput'

type Navigation = {
  endCursor: null | string
  hasNext: boolean
}

export function PermissionGroupsList() {
  const [search, setSearch] = useState('')
  const [groups, setGroups] = useState<CheckboxListOption[]>([])
  const permissionGroups = useExportCommonStore(
    state => state.recipients.permissionGroups
  )
  const [navigation, setNavigation] = useState<Navigation>({
    endCursor: null,
    hasNext: true,
  })
  const [fetchedGroups, refetchedGroups] = useQueryPermissionGroups(
    { first: 100, after: navigation.endCursor },
    { pause: true }
  )

  useEffect(() => {
    if (fetchedGroups.data) {
      const { edges, pageInfo } = fetchedGroups.data.permissionGroups
      setGroups([
        ...groups,
        ...edges.map(({ node }) => ({
          id: node.id,
          name: node.name,
          value: node.id,
          checked: permissionGroups.includes(node.id),
        })),
      ])

      setNavigation(
        produce(draft => {
          draft.endCursor = pageInfo.endCursor
          draft.hasNext = pageInfo.hasNextPage
        })
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchedGroups.data])

  useLayoutEffect(() => {
    if (navigation.hasNext) {
      refetchedGroups()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation])

  if (fetchedGroups.fetching || navigation.hasNext) {
    return <div>Loading...</div>
  }

  return (
    <Box>
      <Box margin="1.2rem 0">
        <SearchInput
          onChange={event => setSearch(event.target.value)}
          value={search}
        />
      </Box>
      <CheckboxList
        options={groups}
        mainCheckboxTitle="Select all groups"
        subCheckboxTitle="Send the report to all groups"
        setOptions={setGroups}
        filter={option => option.name.includes(search)}
      />
    </Box>
  )
}

export default PermissionGroupsList
