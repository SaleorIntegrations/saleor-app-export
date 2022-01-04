import React, { useEffect, useState } from 'react'
import produce from 'immer'

import ModalSetting, { Action, ModalOption } from '../ModalSetting'
import SearchInput from '../../SearchInput'

interface FieldSettingModalProps {
  fields: string[]
  setFields: (newFields: string[]) => void
  setIsOpen: (newIsOpen: boolean) => void
}

export function FieldSettingModal(props: FieldSettingModalProps) {
  const { fields, setFields, setIsOpen } = props
  const [options, setOptions] = useState<ModalOption[]>([])
  const [query, setQuery] = useState('')

  const onAllCheck = (checked: boolean) => {
    setOptions(
      produce(draft => {
        draft.forEach(option => {
          option.checked = checked
        })
      })
    )
  }

  const onSubCheck = (id: string, action: Action) => {
    if (action === 'ADD') {
      setOptions(
        produce(draft => {
          const option = draft.find(option => option.value === id)
          if (option) {
            option.checked = true
          }
        })
      )
    }

    if (action === 'REMOVE') {
      setOptions(
        produce(draft => {
          const option = draft.find(option => option.value === id)
          if (option) {
            option.checked = false
          }
        })
      )
    }
  }

  const onExit = () => {
    setIsOpen(false)
  }

  const onSubmit = () => {
    setFields(
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

  useEffect(() => {
    setOptions([
      {
        id: 'CATEGORY_ID',
        name: 'Category',
        slug: 'category_slug',
        checked: fields.includes('CATEGORY'),
        value: 'CATEGORY',
      },
      {
        id: 'COLLECTIONS_ID',
        name: 'Collections',
        slug: 'Collections_slug',
        checked: fields.includes('COLLECTIONS'),
        value: 'COLLECTIONS',
      },
      {
        id: 'PRODUCT_TYPE_ID',
        name: 'Type',
        slug: 'Product_type_slug',
        checked: fields.includes('PRODUCT_TYPE'),
        value: 'PRODUCT_TYPE',
      },
    ])
  }, [])

  return (
    <ModalSetting
      search={search}
      title="Select Product Organization"
      subtitle="Select the product organizations you want to export information for"
      checkboxTitle="Select all product organizations"
      checkboxSubtitle="Make all variants available on all currently created product organizations."
      options={options.filter(option =>
        option.name.toLowerCase().includes(query.toLowerCase())
      )}
      allChecked={options.every(option => option.checked)}
      onAllCheck={onAllCheck}
      onSubCheck={onSubCheck}
      onExit={onExit}
      onSubmit={onSubmit}
    />
  )
}

export default FieldSettingModal
