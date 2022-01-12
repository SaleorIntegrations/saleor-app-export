import { useMemo } from 'react'
import { useQuery } from 'urql'

import { ExportObjectTypesEnum, ProductField, OrderField } from '../../../globalTypes'

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
              productFields: fields
              attributes
              warehouses
              channels
            }
            ... on OrderSelectedColumnsInfo {
              orderFields: fields
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
          orderFields?: OrderField[]
          productFields?: ProductField[]
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
  after?: string | null
}

export function useQueryReports(variables: Variables, options?: any) {
  return useQuery<ReportsResponse>({
    query: apiQuery,
    variables: variables,
    ...options,
    context: useMemo(() =>({ url: 'http://localhost:4321/graphql/' }), [])
  })
}

export default useQueryReports

