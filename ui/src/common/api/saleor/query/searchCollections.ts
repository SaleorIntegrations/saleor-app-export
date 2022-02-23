import { useQuery, gql } from 'urql'
import { useTenant } from 'saleor-app-ui'

import { PageInfoFragment, CollectionFragment } from '../fragments'
import { Collection, Node, PageInfo } from '../types'
import { useMemo } from 'react'

const apiQuery = gql`
  ${PageInfoFragment}
  ${CollectionFragment}
  query SearchCollections($after: String, $first: Int!, $query: String!) {
    search: collections(
      after: $after
      first: $first
      filter: { search: $query }
    ) {
      edges {
        node {
          ...CollectionFragment
        }
      }
      pageInfo {
        ...PageInfoFragment
      }
    }
  }
`

interface SearchCollections {
  search: {
    edges: Node<Collection>[]
    pageInfo: PageInfo
  }
}

interface Variables {
  after: string
  first: number
  query?: string
}

export function useQuerySearchCollections(variables: Variables, options?: any) {
  const { saleorDomain, saleorToken } = useTenant()
  return useQuery<SearchCollections>({
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

export default useQuerySearchCollections
