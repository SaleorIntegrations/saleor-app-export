import { gql } from 'urql'

import {
  ReportFragment,
  ReportErrorFragment,
} from '../../../../../common/api/export/fragments'
import {
  FilterInfo,
  ProductFieldEnum,
  RecipientInfo,
  ReportResponse,
} from '../../../../../common/api/export/types'
import { useAppMutation } from '../../../../../common/api/export/useAppMutation'

const apiMutation = gql`
  ${ReportErrorFragment}
  ${ReportFragment}
  mutation updateProductRepoort(
    $columns: ProductSelectedColumnsInput!
    $name: String
    $filter: FilterInfoInput
    $reportId: Int!
    $recipients: RecipientInfoInput!
  ) {
    updateProductsReport(
      input: {
        columns: $columns
        name: $name
        filter: $filter
        recipients: $recipients
      }
      reportId: $reportId
    ) {
      report {
        ...ReportFragment
      }
      errors {
        ...ReportErrorFragment
      }
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
  recipients: RecipientInfo
}

export function useMutationUpdateProductReport() {
  return useAppMutation<UpdateProductReportResponse, UpdateProductReportInput>(
    apiMutation
  )
}

export default useMutationUpdateProductReport
