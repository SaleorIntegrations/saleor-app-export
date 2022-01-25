import { useMemo } from 'react'
import { useQuery, gql } from 'urql'
import { useTenant } from 'saleor-app-ui'

import { AttributeFragment } from '../fragments'
import { Attribute, Node } from '../types'

const apiQuery = gql`
  ${AttributeFragment}
  query GridAttributes($ids: [ID!]!) {
    grid: attributes(first: 25, filter: { ids: $ids }) {
      edges {
        node {
          ...AttributeFragment
        }
      }
    }
  }
`

interface GridQueryAttributes {
  grid: {
    edges: Node<Attribute>[]
  }
}

export function useQueryGridAttributes(ids: string[]) {
  const { saleorDomain, saleorToken } = useTenant()
  return useQuery<GridQueryAttributes>({
    query: apiQuery,
    variables: {
      ids: ids,
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
  })
}

export default useQueryGridAttributes
