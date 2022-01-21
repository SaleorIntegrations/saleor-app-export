import { useQuery, gql } from 'urql'

import { AttributeFragment, PageInfoFragment } from '../fragments'
import { Attribute, PageInfo, Node } from '../types'

const apiQuery = gql`
  ${AttributeFragment}
  ${PageInfoFragment}
  query SearchAttributes($after: String, $first: Int!, $query: String!) {
    search: attributes(
      after: $after
      first: $first
      filter: { search: $query }
    ) {
      edges {
        node {
          ...AttributeFragment
        }
      }
      pageInfo {
        ...PageInfoFragment
      }
    }
  }
`

interface SearchAttributes {
  search: {
    edges: Node<Attribute>[]
    pageInfo: PageInfo
  }
}

interface Variables {
  after: string
  first: number
  query?: string
}

export function useQuerySearchAttributes(variables: Variables, options?: any) {
  return useQuery<SearchAttributes>({
    query: apiQuery,
    variables: {
      after: variables.after ? variables.after : '',
      first: variables.first ? variables.first : 5,
      query: variables.query ? variables.query : '',
    },
    ...options,
  })
}

export default useQuerySearchAttributes
