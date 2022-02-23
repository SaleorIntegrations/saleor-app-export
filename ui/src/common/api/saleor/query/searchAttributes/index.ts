import { useQuery, gql } from 'urql'
import { useTenant } from 'saleor-app-ui'

import { AttributeFragment, PageInfoFragment } from '../../fragments'
import { Attribute, PageInfo, Node } from '../../types'
import { useMemo } from 'react'

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
  const { saleorDomain, saleorToken } = useTenant()
  return useQuery<SearchAttributes>({
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

export default useQuerySearchAttributes
