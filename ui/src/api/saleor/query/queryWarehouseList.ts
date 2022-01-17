import { useQuery, gql } from 'urql'

import { WarehouseFragment, PageInfoFragment } from '../fragments'
import { Warehouse, PageInfo, Node } from '../types'

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
  return useQuery<WarehouseList>({
    query: apiQuery,
    variables: {
      first: variables.first ? variables.first : '100',
    },
    ...options,
  })
}

export default useQueryWarehouseList
