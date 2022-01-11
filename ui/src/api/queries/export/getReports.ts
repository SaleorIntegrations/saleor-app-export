import { useQuery } from 'urql'

import { ExportObjectTypesEnum, ProductField } from '../../../globalTypes'

const apiQuery = `
  query getReports($first: Int!, $after: String) {
    reports(first: $first, after: $after) {
      edges {
        node {
          id
          name
          type
          filter
          columns {
            __typename
            ... on ProductSelectedColumnsInfo {
              fields
              attributes
              warehouses
              channels
            }
          }
        }
      }
      pageInfo {
        hasNext
        endCursor
      }
      totalCount
    }
  }
`

interface ReportsResponse {
  reports: {
    edges: {
      node: {
        id: number
        name: string
        type: ExportObjectTypesEnum
        filter: string | null
        columns: {
          __typename: string
          fields: ProductField[]
          attributes?: string[]
          warehouses?: string[]
          channels?: string[]
        }
      }
    }[]
    pageInfo: {
      hasNext: boolean
      endCursor: string | null
    }
    totalCount: number
  }
}

interface Variables {
  first: number
  after?: string
}

export function useQueryReports(variables: Variables, options: any) {
  return useQuery<ReportsResponse>({
    query: apiQuery,
    variables: variables,
    ...options
  })
}

export default useQueryReports

