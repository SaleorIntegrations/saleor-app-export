import { useQuery, gql } from 'urql'
import { useTenant } from 'saleor-app-ui'
import { useMemo } from 'react'
import { isHTTP } from '../../../../utils'

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
  const { saleorDomain, saleorToken } = useTenant()
  return useQuery<ProductCountQuery>({
    query: apiQuery,
    variables: variables,
    context: useMemo(
      () => ({
        url: `http${isHTTP() ? '' : 's'}://${saleorDomain}/graphql/`,
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

export default useProductCountQuery
