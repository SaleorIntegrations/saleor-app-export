import React, { useState } from 'react'
import produce from 'immer'

import ModalSetting, { Action, ModalOption } from '../ModalSetting'
import SearchInput from '../../SearchInput'

interface FinancialSettingModalProps {
  fields: string[]
  setFields: (newFields: string[]) => void
  setIsOpen: (newIsOpen: boolean) => void
}

export function FinancialSettingModal(props: FinancialSettingModalProps) {
  const { fields, setFields, setIsOpen } = props
  const [options, setOptions] = useState<ModalOption[]>([
    {
      id: 'CHARGE_TAXES_ID',
      name: 'Charge Taxes',
      slug: 'charge_taxes_slug',
      checked: fields.includes('CHARGE_TAXES'),
      value: 'CHARGE_TAXES',
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
      title="Select Financial Informations"
      subtitle="Select the financial informations you want to export information for"
      checkboxTitle="Select all financial informations"
      checkboxSubtitle="Make all variants available on all currently created financial informations."
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

export default FinancialSettingModal
