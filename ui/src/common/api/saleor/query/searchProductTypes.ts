import { useMemo } from 'react'
import { useQuery, gql } from 'urql'
import { useTenant } from 'saleor-app-ui'

import { PageInfoFragment, ProductTypeFragment } from '../fragments'
import { ProductType, Node, PageInfo } from '../types'

const apiQuery = gql`
  ${PageInfoFragment}
  ${ProductTypeFragment}
  query SearchProductTypes($after: String, $first: Int!, $query: String!) {
    search: productTypes(
      after: $after
      first: $first
      filter: { search: $query }
    ) {
      edges {
        node {
          ...ProductTypeFragment
        }
      }
      pageInfo {
        ...PageInfoFragment
      }
    }
  }
`

interface SearchProductTypes {
  search: {
    edges: Node<ProductType>[]
    pageInfo: PageInfo
  }
}

interface Variables {
  after: string
  first: number
  query?: string
}

export function useQuerySearchProductTypes(
  variables: Variables,
  options?: any
) {
  const { saleorDomain, saleorToken } = useTenant()
  return useQuery<SearchProductTypes>({
    query: apiQuery,
    variables: {
      after: variables.after ? variables.after : '',
      first: variables.first ? variables.first : 5,
      query: variables.query ? variables.query : '',
    },
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

export default useQuerySearchProductTypes
