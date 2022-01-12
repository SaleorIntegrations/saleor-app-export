import { useMutation } from 'urql'

import { ExportProductsInput, ReportErrorCode } from '../../../globalTypes'

const apiMutation = `
  mutation createProductsReport($columns: ProductSelectedColumnsInput!, $name: String, $filter: ProductFilterInfo) {
    createProductsReport(input: {
      columns: $columns
      name: $name
      filter: $filter
    }) {
      report {
        id
      }
      errors {
        code
        message
        field
      }
    }
  }
`

interface CreateProductsReport {
  createProductsReport: {
    report: {
      id: number
    }
    errors: {
      code: ReportErrorCode
      message: string
      field: string
    }[]
  }
}

export function useMutationCreateProductsReport() {
  return useMutation<CreateProductsReport, ExportProductsInput>(apiMutation)
}

export default useMutationCreateProductsReport
