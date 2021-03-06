import React, { useEffect, useState } from 'react'
import { Skeleton } from '@material-ui/lab'

import {
  useProduct,
  FieldEditPlatform,
  FieldEdit,
  SearchInput,
  CheckAll,
  BlurDialog,
} from '../../../common'
import { useQueryBaseChannels } from '../../../common/api/saleor/query'
import { OptionsCheck, Option } from '../../../common/components/OptionsCheck'

export function ChannelsEdit() {
  const [channels, setChannels] = useProduct(store => [
    store.columns.channels,
    store.setChannels,
  ])
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [fetchedChannels, fetchChannels] = useQueryBaseChannels({ pause: true })
  const [options, setOptions] = useState<Option[]>([])

  const onSubmit = () => {
    setChannels(
      options.filter(option => option.checked).map(option => option.value)
    )
    setIsOpen(false)
  }

  useEffect(() => {
    if (!fetchedChannels.data || fetchedChannels.fetching) return

    setOptions(
      fetchedChannels.data.channels.map(channel => ({
        name: channel.name,
        checked: channels.includes(channel.id),
        value: channel.id,
      }))
    )
  }, [fetchedChannels.data])

  useEffect(() => {
    fetchChannels()
  }, [])

  return (
    <>
      <FieldEdit
        setIsOpen={setIsOpen}
        title="Channels"
        description={
          channels.length ? `selected ${channels.length}` : undefined
        }
      />
      <BlurDialog onClose={() => setIsOpen(false)} open={isOpen}>
        <FieldEditPlatform
          search={
            <SearchInput
              onChange={event => setQuery(event.target.value)}
              value={query}
            />
          }
          title="Select channels"
          subtitle="Select the channels you want to export information for"
          onSubmit={onSubmit}
          onExit={() => setIsOpen(false)}
        >
          {!query && (
            <CheckAll
              title="Select all channels"
              description="Make all channels available on all currently created options."
              isChecked={options.every(option => option.checked)}
              setOptions={setOptions}
              options={options}
            />
          )}
          <OptionsCheck
            options={options.filter(option =>
              option.name.toLowerCase().includes(query.toLowerCase())
            )}
            setOptions={setOptions}
          />
          {fetchedChannels.fetching && <Skeleton height={80} />}
        </FieldEditPlatform>
      </BlurDialog>
    </>
  )
}

export default ChannelsEdit
