import { useQuery, gql } from 'urql'

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
  return useQuery<GridQueryAttributes>({
    query: apiQuery,
    variables: {
      ids: ids,
    },
  })
}

export default useQueryGridAttributes
