import React, { useEffect, useState } from 'react'
import { Skeleton } from '@material-ui/lab'
import { Box, Button, Dialog } from '@material-ui/core'
import produce from 'immer'

import {
  useProduct,
  FieldEditPlatform,
  FieldEdit,
  SearchInput,
} from '../../../common'
import { useQuerySearchAttributes } from '../../../common/api/saleor/query'
import { OptionsCheck, Option } from '../../../common/components/OptionsCheck'

export function AttributesEdit() {
  const [attributes, setAttributes] = useProduct(store => [
    store.columns.attributes,
    store.setAttributes,
  ])
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [navigation, setNavigation] = useState({
    after: '',
    first: 10,
    hasNext: true,
  })
  const [fetchedAttributes, refetchAttributes] = useQuerySearchAttributes(
    {
      first: navigation.first,
      after: navigation.after,
      query: query,
    },
    {
      pause: true,
    }
  )
  const [options, setOptions] = useState<Option[]>([])

  const onSubmit = () => {
    setAttributes(
      options.filter(option => option.checked).map(option => option.value)
    )
    setIsOpen(false)
  }

  const search = (
    <SearchInput
      onChange={event => setQuery(event.target.value)}
      value={query}
    />
  )

  const onCheck = (option: Option) => {
    setOptions(
      produce(draft => {
        const index = draft.findIndex(attr => attr.value === option.value)
        draft[index].checked = !option.checked
      })
    )
  }

  useEffect(() => {
    if (!fetchedAttributes.data || fetchedAttributes.fetching) return

    setOptions([
      ...options,
      ...fetchedAttributes.data.search.edges.map(({ node }) => ({
        name: node.name,
        checked: attributes.includes(node.id),
        value: node.id,
      })),
    ])
    setNavigation(
      produce(draft => {
        const pageInfo = fetchedAttributes.data?.search.pageInfo
        draft.after = pageInfo?.endCursor || ''
        draft.hasNext = !!pageInfo?.hasNextPage
      })
    )
  }, [fetchedAttributes.data])

  useEffect(() => {
    refetchAttributes()
  }, [])

  return (
    <>
      <FieldEdit
        setIsOpen={setIsOpen}
        title="Attributes"
        description={
          attributes.length ? `selected ${attributes.length}` : undefined
        }
      />
      <Dialog onClose={() => setIsOpen(false)} open={isOpen}>
        <FieldEditPlatform
          search={search}
          title="Select attributes"
          subtitle="Select the attributes you want to export information for"
          onSubmit={onSubmit}
          onExit={() => setIsOpen(false)}
        >
          <OptionsCheck options={options} onCheck={onCheck} />
          {fetchedAttributes.fetching && <Skeleton height={80} />}
          {navigation.hasNext ? (
            <Box marginTop={2}>
              <Button
                color="primary"
                variant="outlined"
                onClick={() => refetchAttributes()}
              >
                More
              </Button>
            </Box>
          ) : undefined}
        </FieldEditPlatform>
      </Dialog>
    </>
  )
}

export default AttributesEdit
