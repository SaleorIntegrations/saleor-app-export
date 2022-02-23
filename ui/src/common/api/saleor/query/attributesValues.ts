import { useMemo } from 'react'
import { useQuery, gql } from 'urql'
import { useTenant } from 'saleor-app-ui'

import { PageInfoFragment, AttributeValueFragment } from '../fragments'
import { AttributeValue, PageInfo, Node } from '../types'

const apiQuery = gql`
  ${PageInfoFragment}
  ${AttributeValueFragment}
  query SearchAttributeValues(
    $id: ID
    $after: String
    $first: Int!
    $query: String!
  ) {
    attribute(id: $id) {
      id
      choices(after: $after, first: $first, filter: { search: $query }) {
        edges {
          node {
            ...AttributeValueFragment
          }
        }
        pageInfo {
          ...PageInfoFragment
        }
      }
    }
  }
`

interface SearchAttributeValuesQuery {
  attribute: {
    id: string
    choices: {
      edges: Node<AttributeValue>[]
      pageInfo: PageInfo
    }
  }
}

export function useSearchAttributeValuesQuery(
  id: string,
  after: string,
  first: number,
  query: string,
  options?: any
) {
  const { saleorDomain, saleorToken } = useTenant()

  return useQuery<SearchAttributeValuesQuery>({
    query: apiQuery,
    variables: {
      id: id,
      after: after,
      first: first,
      query: query,
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
