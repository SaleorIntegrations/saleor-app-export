import { useQuery, gql } from 'urql'
import { useTenant } from 'saleor-app-ui'

import { WarehouseFragment, PageInfoFragment } from '../fragments'
import { Warehouse, PageInfo, Node } from '../types'
import { useMemo } from 'react'

const apiQuery = gql`
  ${WarehouseFragment}
  ${PageInfoFragment}
  query WarehouseList(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $filter: WarehouseFilterInput
    $sort: WarehouseSortingInput
  ) {
    warehouses(
      before: $before
      after: $after
      first: $first
      last: $last
      filter: $filter
      sortBy: $sort
    ) {
      edges {
        node {
          ...WarehouseFragment
        }
      }
      pageInfo {
        ...PageInfoFragment
      }
    }
  }
`

interface WarehouseList {
  warehouses: {
    edges: Node<Warehouse>[]
    pageInfo: PageInfo
  }
}

interface Variables {
  first?: number
}

export function useQueryWarehouseList(variables: Variables, options?: any) {
  const { saleorDomain, saleorToken } = useTenant()
  return useQuery<WarehouseList>({
    query: apiQuery,
    variables: {
      first: variables.first ? variables.first : '100',
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

export default useQueryWarehouseList
