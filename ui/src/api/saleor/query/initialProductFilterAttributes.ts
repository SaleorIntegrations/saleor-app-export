import { useQuery, gql } from 'urql'

import { AttributeFragment } from '../fragments'
import { Attribute, Node } from '../types'

const apiQuery = gql`
  ${AttributeFragment}
  query InitialProductFilterAttributes {
    attributes(
      first: 100
      filter: { filterableInDashboard: true, type: PRODUCT_TYPE }
    ) {
      edges {
        node {
          ...AttributeFragment
        }
      }
    }
  }
`

interface InitialProductFilterAttributes {
  attributes: {
    edges: Node<Attribute>[]
  }
}

export function useQueryInitialProductFilterAttributes(options?: any) {
  return useQuery<InitialProductFilterAttributes>({
    query: apiQuery,
    ...options,
  })
}

export default useQueryInitialProductFilterAttributes
