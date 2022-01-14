import { useMutation } from 'urql'

import { ReportErrorCode, ExportObjectTypesEnum, OrderField } from '../../../globalTypes'

const apiMutation = `
  mutation updateOrdersReport($fields: [OrderFieldEnum!]!, $name: String, $filter: OrderFilterInfo, $reportId: Int!) {
    updateOrdersReport(input: { columns: { fields: $fields }, name: $name, filter: $filter }, reportId: $reportId) {
      report {
        __typename
        id
        name
        type
        filter
        columns {
          __typename
          ... on OrderSelectedColumnsInfo {
            fields
          }
        }
      }
      errors {
        __typename
        code
        message
        field
      }
      __typename
    }
  }
`

interface UpdateOrderReport {
  updateOrdersReport: {
    __typename: string
    report: null | {
      __typename: string
      id: number
      name: string
      type: ExportObjectTypesEnum
      filter: string | null
      columns: {
        __typename: string
        fields: OrderField[]
      }
    }
    errors: {
      __typename: string
      code: ReportErrorCode
      message: string
      field: string
    }[]
  }
}

interface UpdateOrderReportInput {
  fields: OrderField[]
  name?: string
  filter?: {
    filterStr: string
  }
  reportId: number
}

export function useMutationUpdateOrderReport() {
  return useMutation<UpdateOrderReport, UpdateOrderReportInput>(apiMutation)
}

export default useMutationUpdateOrderReport
