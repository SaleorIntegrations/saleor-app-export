import { useQuery } from 'urql'

import { ProductFilterInput } from '../globalTypes'

const apiQuery = `
  query ProductCount($filter: ProductFilterInput, $channel: String) {
    products(filter: $filter, channel: $channel) {
      totalCount
      __typename
    }
  }
`

interface ProductCountQuery {
  products: {
    totalCount: number
    __typename: string
  }
}

interface Variables {
  filter?: ProductFilterInput
  channel?: string
}

export function useProductCountQuery(variables?: Variables, options?: any) {
  return useQuery<ProductCountQuery>({
    query: apiQuery,
    variables: variables,
    ...options,
  })
}

export default useProductCountQuery
