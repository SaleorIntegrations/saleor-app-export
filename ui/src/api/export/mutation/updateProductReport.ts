import { useMutation, gql } from 'urql'

import { ReportFragment, ReportErrorFragment } from '../../export/fragments'
import { FilterInfo, ProductFieldEnum, ReportResponse } from '../../export/types'

const apiMutation = gql`
  ${ReportErrorFragment}
  ${ReportFragment}
  mutation updateProductRepoort($columns: ProductSelectedColumnsInput!, $name: String, $filter: ProductFilterInfo, $reportId: Int!) {
    updateProductsReport(input: {
      columns: $columns
      name: $name
      filter: $filter
    }, reportId: $reportId) {
      report {
        ...ReportFragment
      }
      errors {
        ...ReportErrorFragment
      }
      __typename
    }
  }
`

interface UpdateProductReportResponse {
  updateProductsReport: ReportResponse
}

interface UpdateProductReportInput {
  reportId: number
  name?: string
  filter?: FilterInfo
  columns: {
    fields: ProductFieldEnum[]
    attributes: string[]
    warehouses: string[]
    channels: string[]
  }
}

export function useMutationUpdateProductReport() {
  return useMutation<UpdateProductReportResponse, UpdateProductReportInput>(apiMutation)
}

export default useMutationUpdateProductReport
