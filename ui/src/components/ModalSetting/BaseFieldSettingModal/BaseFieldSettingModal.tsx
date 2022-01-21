import React, { useState } from 'react'

import ModalSetting, { ModalOption } from '../ModalSetting'
import SearchInput from '../../SearchInput'

interface BaseFieldSettingModalProps {
  fields: string[]
  title: string
  subtitle: string
  setFields: (newFields: string[]) => void
  fieldOptions: ModalOption[]
  setIsOpen: (newIsOpen: boolean) => void
}

export function BaseFieldSettingModal(props: BaseFieldSettingModalProps) {
  const { setFields, setIsOpen, fieldOptions, title, subtitle } = props
  const [options, setOptions] = useState(fieldOptions)
  const [query, setQuery] = useState('')

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
      title={title}
      subtitle={subtitle}
      checkboxTitle="Select all fields"
      checkboxSubtitle="Make all variants available on all currently created options."
      options={options}
      filter={option => option.name.toLowerCase().includes(query.toLowerCase())}
      setOptions={setOptions}
      onExit={onExit}
      onSubmit={onSubmit}
    />
  )
}

export default BaseFieldSettingModal
