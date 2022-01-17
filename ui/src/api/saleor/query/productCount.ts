import { useQuery, gql } from 'urql'

const apiQuery = gql`
  query ProductCount($filter: ProductFilterInput, $channel: String) {
    products(filter: $filter, channel: $channel) {
      totalCount
    }
  }
`

interface ProductCountQuery {
  products: {
    totalCount: number
  }
}

interface Variables {
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
