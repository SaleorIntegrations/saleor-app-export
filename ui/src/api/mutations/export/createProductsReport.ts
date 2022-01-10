import { useMutation } from 'urql'

import { ExportProductsInput } from '../../../globalTypes'

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
        message
      }
    }
  }
`

interface CreateProductsReport {
  createProductsReport: {
    report: {
      id: number
    }
    errors: any
  }
}

export function useMutationCreateProductsReport() {
  return useMutation<CreateProductsReport, ExportProductsInput>(apiMutation)
}

export default useMutationCreateProductsReport
