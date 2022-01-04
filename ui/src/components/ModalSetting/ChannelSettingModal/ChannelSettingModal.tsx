import React, { useEffect, useState } from 'react'
import produce from 'immer'

import ModalSetting, { Action } from '../ModalSetting'
import SearchInput from '../../SearchInput'

interface ChannelSettingModalProps {
  channels: string[]
  setChannels: (newChannels: string[]) => void
  setIsOpen: (newIsOpen: boolean) => void
}

export function ChannelSettingModal(props: ChannelSettingModalProps) {
  const { channels, setChannels, setIsOpen } = props
  const [options, setOptions] = useState(selectOptions)
  const [query, setQuery] = useState('')

  const onAllCheck = (checked: boolean) => {
    setOptions(
      produce(draft => {
        draft.forEach(option => {
          option.checked = checked
        })
      })
    )

    if (checked) {
      setChannels(options.map(option => option.value))
    } else {
      setChannels([])
    }
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
      setChannels([...channels, id])
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
      setChannels(channels.filter(channel => channel !== id))
    }
  }

  const onExit = () => {
    setIsOpen(false)
  }

  const onSubmit = () => {
    setChannels(
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
    setOptions(
      produce(draft => {
        draft.forEach(option => {
          if (channels.includes(option.value)) option.checked = true
        })
      })
    )
  }, [])

  return (
    <ModalSetting
      search={search}
      title="Select channels"
      subtitle="Select the channels you want to export information for"
      checkboxTitle="Select all channels"
      checkboxSubtitle="Make all variants available on all currently created channels."
      options={options}
      filteredOptions={options.filter(option =>
        option.name.toLowerCase().includes(query.toLowerCase())
      )}
      onAllCheck={onAllCheck}
      onSubCheck={onSubCheck}
      onExit={onExit}
      onSubmit={onSubmit}
    />
  )
}

export default ChannelSettingModal

const selectOptions = [
  {
    id: '1',
    slug: '1',
    type: 'type-1',
    value: 'value-1',
    checked: false,
    name: 'value one',
  },
  {
    id: '2',
    slug: '2',
    type: 'type-2',
    value: 'value-2',
    checked: false,
    name: 'value two',
  },
  {
    id: '3',
    slug: '3',
    type: 'type-3',
    value: 'value-3',
    checked: false,
    name: 'value three',
  },
]
