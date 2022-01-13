import { useMutation } from 'urql'

import { ExportObjectTypesEnum, ProductField, OrderField } from '../../../globalTypes'

const apiMutation = `
  mutation runReport($reportId: Int!) {
    runReport(reportId: $reportId) {
      job {
        id
        createdAt
        report {
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
            __typename
          }
          __typename
        }
      }
      __typename
    }
  }
`

interface RunReport {
  runReport: {
    job: {
      id: number
      createdAt: string
      report: {
        id: number
        name: string
        filter: string | null
        type: ExportObjectTypesEnum
        columns: {
          productFields?: ProductField[]
          orderFields?: OrderField[]
          attributes?: string[]
          warehouses?: string[]
          channels?: string[]
          __typename: string
        }
        __typename: string
      }
      __typename: string
    }
    __typename: string
  }
}

interface RunReportInput {
  reportId: number
}

export function useMutationRunReport() {
  return useMutation<RunReport, RunReportInput>(apiMutation)
}

export default useMutationRunReport
