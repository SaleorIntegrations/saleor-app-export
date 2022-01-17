import { useQuery, gql } from 'urql'

import { PageInfoFragment, CollectionFragment } from '../fragments'
import { Collection, Node, PageInfo } from '../types'

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
  return useQuery<SearchCollections>({
    query: apiQuery,
    variables: {
      after: variables.after ? variables.after : '',
      first: variables.first ? variables.first : 5,
      query: variables.query ? variables.query : '',
    },
    ...options,
  })
}

export default useQuerySearchCollections
