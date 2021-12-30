import { useQuery } from 'urql'

const apiQuery = `
  query BaseChannels {
    channels {
      id
      isActive
      name
      slug
      currencyCode
      defaultCountry {
        code
        country
        __typename
      }
      __typename
    }
  }
`

interface BaseChannels {
  channels: {
    id: string
    isActive: true
    name: string
    slug: string
    currencyCode: string
    defaultCountry: {
      code: string
      country: string
      __typename: string
    }
    __typename: string
  }[]
}

export function useQueryBaseChannels(options?: any) {
  return useQuery<BaseChannels>({
    query: apiQuery,
    ...options,
  })
}

export default useQueryBaseChannels
