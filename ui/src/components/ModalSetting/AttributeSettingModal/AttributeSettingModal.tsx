import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Skeleton } from '@material-ui/lab'
import produce from 'immer'

import ModalSetting, { ModalOption } from '../ModalSetting'
import SearchInput from '../../SearchInput'
import { useQuerySearchAttributes } from '../../../api/searchAttributes'

interface AttributeSettingModalProps {
  attributes: string[]
  setAttributes: (newAttributes: string[]) => void
  setIsOpen: (newIsOpen: boolean) => void
}

export function AttributeSettingModal(props: AttributeSettingModalProps) {
  const { attributes, setAttributes, setIsOpen } = props
  const [query, setQuery] = useState('')
  const [navigation, setNavigation] = useState({
    after: '',
    first: 25,
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
  const [options, setOptions] = useState<ModalOption[]>([])

  const onExit = () => {
    setIsOpen(false)
  }

  const onSubmit = () => {
    setAttributes(
      options.filter(option => option.checked).map(option => option.value)
    )
    setIsOpen(false)
  }

  const onSearch = (
    _event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setQuery(_event.target.value)
  }

  const search = <SearchInput onChange={onSearch} value={query} />

  useLayoutEffect(() => {
    if (fetchedAttributes.data && !fetchedAttributes.fetching) {
      setOptions([
        ...options,
        ...fetchedAttributes.data.search.edges.map(({ node }) => ({
          id: node.id,
          name: node.name,
          slug: node.slug,
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
    }
  }, [fetchedAttributes.data])

  useEffect(() => {
    if (navigation.hasNext) refetchAttributes()
  }, [navigation])

  if (fetchedAttributes.fetching) return <Skeleton />

  return (
    <ModalSetting
      search={search}
      title="Select attributes"
      subtitle="Select the attributes you want to export information for"
      checkboxTitle="Select all attributes"
      checkboxSubtitle="Make all variants available on all currently created attributes."
      options={options}
      filter={option => option.name.toLowerCase().includes(query.toLowerCase())}
      setOptions={setOptions}
      onExit={onExit}
      onSubmit={onSubmit}
    />
  )
}

export default AttributeSettingModal
