import { useMutation } from 'urql'

import { ReportErrorCode, ExportObjectTypesEnum, ProductField, ExportProductsInput } from '../../../globalTypes'

const apiMutation = `
  mutation updateProductRepoort($input: ExportProductsInput!, $reportId: Int!) {
    updateProductsReport(input: $input, reportId: $reportId) {
      report {
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
      errors {
        code
        message
        field
      }
    }
  }
`

interface UpdateProductReport {
  updateProductsReport: {
    report: {
      id: number
      name: string
      type: ExportObjectTypesEnum
      filter: string | null
      columns: {
        fields: ProductField[]
        attributes: string[]
        warehouses: string[]
        channels: string[]
      }
    }
    errors: {
      code: ReportErrorCode,
      message: string
      field: string
    }[]
    __typename: string
  }
}

interface UpdateProductReportInput {
  reportId: number
  input: ExportProductsInput
}

export function useMutationUpdateProductReport() {
  return useMutation<UpdateProductReport, UpdateProductReportInput>(apiMutation)
}

export default useMutationUpdateProductReport
