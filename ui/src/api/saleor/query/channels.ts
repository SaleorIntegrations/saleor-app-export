import { useQuery, gql } from 'urql'

import { ChannelFragment } from '../fragments'
import { Channel } from '../types'

const apiQuery = gql`
  ${ChannelFragment}
  query BaseChannels {
    channels {
      ...ChannelFragment
    }
  }
`

interface BaseChannels {
  channels: Channel[]
}

export function useQueryBaseChannels(options?: any) {
  return useQuery<BaseChannels>({
    query: apiQuery,
    ...options,
  })
}

export default useQueryBaseChannels
