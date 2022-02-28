import { useMemo } from 'react'
import { useQuery, gql } from 'urql'
import { useTenant } from 'saleor-app-ui'

import { ChannelFragment } from '../../fragments'
import { Channel } from '../../types'

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
  const { saleorDomain, saleorToken } = useTenant()

  return useQuery<BaseChannels>({
    query: apiQuery,
    context: useMemo(
      () => ({
        url: `http://${saleorDomain}/graphql/`,
        fetchOptions: {
          headers: {
            authorization: `JWT ${saleorToken}`,
          },
        },
      }),
      [saleorDomain, saleorToken]
    ),
    ...options,
  })
}

export default useQueryBaseChannels
