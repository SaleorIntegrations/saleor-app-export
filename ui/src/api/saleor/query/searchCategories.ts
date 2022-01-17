import { useQuery, gql } from 'urql'

import { PageInfoFragment, CategoryFragment } from '../fragments'
import { Category, PageInfo, Node } from '../types'

const apiQuery = gql`
  ${PageInfoFragment}
  ${CategoryFragment}
  query SearchCategories($after: String, $first: Int!, $query: String!) {
    search: categories(after: $after, first: $first, filter: {search: $query}) {
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
  return useQuery<SearchCategories>({
    query: apiQuery,
    variables: {
      after: variables.after ? variables.after : '',
      first: variables.first ? variables.first : 5,
      query: variables.query ? variables.query : '',
    },
    ...options,
  })
}

export default useQuerySearchCategories
