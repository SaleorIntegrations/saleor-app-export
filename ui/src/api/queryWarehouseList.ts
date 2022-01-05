import { useQuery } from 'urql'

const apiQuery = `
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
          id
          name
          slug
          shippingZones(first: 100) {
            edges {
              node {
                id
                name
                __typename
              }
              __typename
            }
            __typename
          }
          __typename
        }
        __typename
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
        __typename
      }
      __typename
    }
  }
`

interface WarehouseList {
  warehouses: {
    edges: {
      node: {
        id: string
        name: string
        slug: string
        shippingZones: {
          edges: {
            node: {
              id: string
              name: string
              __typename: string
            }
            __typename: string
          }
          __typename: string
        }
        __typename: string
      }
      __typename: string
    }[]
    pageInfo: {
      endCursor: string
      hasNextPage: boolean
      hasPreviousPage: boolean
      startCursor: string
      __typename: string
    }
    __typename: string
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
