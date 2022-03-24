import React, { useEffect, useState } from 'react'

import { ModalOption, ModalSetting } from '../ModalSetting'
import SearchInput from '../../SearchInput'
import { useQueryBaseChannels } from '../../../api/saleor/query'

interface ChannelSettingModalProps {
  channels: string[]
  setChannels: (newChannels: string[]) => void
  setIsOpen: (newIsOpen: boolean) => void
}

export function ChannelSettingModal(props: ChannelSettingModalProps) {
  const { channels, setChannels, setIsOpen } = props
  const [fetchedChannels] = useQueryBaseChannels()
  const [options, setOptions] = useState<ModalOption[]>([])
  const [query, setQuery] = useState('')

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
    if (fetchedChannels.data) {
      setOptions(
        fetchedChannels.data.channels.map(channel => ({
          id: channel.id,
          name: channel.name,
          slug: channel.slug,
          checked: channels.includes(channel.id),
          value: channel.id,
        }))
      )
    }
  }, [fetchedChannels.data])

  return (
    <ModalSetting
      search={search}
      title="Select channels"
      subtitle="Select the channels you want to export information for"
      checkboxTitle="Select all channels"
      checkboxSubtitle="Make all variants available on all currently created channels."
      options={options}
      filter={option => option.name.toLowerCase().includes(query.toLowerCase())}
      setOptions={setOptions}
      onExit={onExit}
      onSubmit={onSubmit}
    />
  )
}

export default ChannelSettingModal
