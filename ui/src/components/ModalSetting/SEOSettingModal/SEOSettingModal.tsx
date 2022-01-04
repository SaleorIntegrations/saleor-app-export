import React, { useState } from 'react'
import produce from 'immer'

import ModalSetting, { Action, ModalOption } from '../ModalSetting'
import SearchInput from '../../SearchInput'

interface SEOSettingModalProps {
  fields: string[]
  setFields: (newFields: string[]) => void
  setIsOpen: (newIsOpen: boolean) => void
}

export function SEOSettingModal(props: SEOSettingModalProps) {
  const { fields, setFields, setIsOpen } = props
  const [options, setOptions] = useState<ModalOption[]>([
    {
      id: 'DESCRIPTION_ID',
      name: 'Description',
      slug: 'description_slug',
      checked: fields.includes('DESCRIPTION'),
      value: 'DESCRIPTION',
    },
    {
      id: 'NAME_ID',
      name: 'Name',
      slug: 'name_slug',
      checked: fields.includes('NAME'),
      value: 'NAME',
    },
    {
      id: 'PRODUCT_MEDIA_ID',
      name: 'Product Images',
      slug: 'product_media_slug',
      checked: fields.includes('PRODUCT_MEDIA'),
      value: 'PRODUCT_MEDIA',
    },
    {
      id: 'VARIANT_MEDIA_ID',
      name: 'Variant Images',
      slug: 'variant_images_slug',
      checked: fields.includes('VARIANT_MEDIA'),
      value: 'VARIANT_MEDIA',
    },
  ])
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

  return (
    <ModalSetting
      search={search}
      title="Select SEO Informations"
      subtitle="Select the SEO informations you want to export information for"
      checkboxTitle="Select all SEO informations"
      checkboxSubtitle="Make all variants available on all currently created SEO informations."
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

export default SEOSettingModal
