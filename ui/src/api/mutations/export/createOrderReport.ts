import { useMutation } from 'urql'

import { ReportErrorCode, ExportObjectTypesEnum, OrderField } from '../../../globalTypes'

const apiMutation = `
  mutation createOrdersReport($fields: [OrderFieldEnum!]!, $name: String, $filter: OrderFilterInfo) {
    createOrdersReport(input: { columns: { fields: $fields }, name: $name, filter: $filter }) {
      report {
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
        __typename
      }
      errors {
        code
        message
        field
        __typename
      }
      __typename
    }
  }
`

interface CreateOrdersReport {
  createOrdersReport: {
    report: null | {
      id: number
      name: string
      type: ExportObjectTypesEnum
      filter: null | string
      columns: {
        __typename: string
        fields: OrderField[]
      }
      __typename: string
    }
    errors: {
      code: ReportErrorCode
      message: string
      field: string
      __typename: string
    }[]
    __typename: string
  }
}

interface ExportOrderInput {
  fields: OrderField[]
  name?: string
  filter?: {
    filterStr: string
  }
}

export function useMutationCreateOrdersReport() {
  return useMutation<CreateOrdersReport, ExportOrderInput>(apiMutation)
}

export default useMutationCreateOrdersReport
