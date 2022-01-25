import { useQuery, gql } from 'urql'
import { useTenant } from 'saleor-app-ui'

import { AttributeFragment } from '../fragments'
import { Attribute, Node } from '../types'
import { useMemo } from 'react'

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
  const { saleorDomain, saleorToken } = useTenant()
  return useQuery<InitialProductFilterAttributes>({
    query: apiQuery,
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

export default useQueryInitialProductFilterAttributes
