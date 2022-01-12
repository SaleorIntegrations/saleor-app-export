import { useMemo } from 'react'
import { useQuery } from 'urql'

import { ExportObjectTypesEnum, ProductField, OrderField } from '../../../globalTypes'

const apiQuery = `
  query getReport($reportId: Int!) {
    report(id: $reportId) {
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
`

interface ReportResponse {
  report: {
    id: number
    name: string
    type: ExportObjectTypesEnum
    filter?: string
    columns: {
      productFields?: ProductField[]
      orderFields?: OrderField[]
      attributes?: string[]
      warehouses?: string[]
      channels?: string[]
    }
  }
}

interface Variables {
  reportId: number
}

export function useQueryReport(variables: Variables, options?: any) {
  return useQuery<ReportResponse>({
    query: apiQuery,
    variables: variables,
    ...options,
    context: useMemo(() =>({ url: 'http://localhost:4321/graphql/' }), [])
  })
}

export default useQueryReport
