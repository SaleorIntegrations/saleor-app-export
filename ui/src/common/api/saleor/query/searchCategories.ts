import { useQuery, gql } from 'urql'
import { useTenant } from 'saleor-app-ui'

import { PageInfoFragment, CategoryFragment } from '../fragments'
import { Category, PageInfo, Node } from '../types'
import { useMemo } from 'react'

const apiQuery = gql`
  ${PageInfoFragment}
  ${CategoryFragment}
  query SearchCategories($after: String, $first: Int!, $query: String!) {
    search: categories(
      after: $after
      first: $first
      filter: { search: $query }
    ) {
      edges {
        node {
          ...CategoryFragment
        }
      }
      pageInfo {
        ...PageInfoFragment
      }
    }
  }
`

interface SearchCategories {
  search: {
    edges: Node<Category>[]
    pageInfo: PageInfo
  }
}

interface Variables {
  after: string
  first: number
  query?: string
}

export function useQuerySearchCategories(variables: Variables, options?: any) {
  const { saleorDomain, saleorToken } = useTenant()
  return useQuery<SearchCategories>({
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

export default useQuerySearchCategories
