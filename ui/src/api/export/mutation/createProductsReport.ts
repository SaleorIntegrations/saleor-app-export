import { gql } from 'urql'

import { ReportFragment, ReportErrorFragment } from '../../export/fragments'
import {
  ReportResponse,
  FilterInfo,
  ProductFieldEnum,
  RecipientInfo,
} from '../../export/types'
import { useAppMutation } from '../useAppMutation'

const apiMutation = gql`
  ${ReportFragment}
  ${ReportErrorFragment}
  mutation createProductsReport(
    $columns: ProductSelectedColumnsInput!
    $name: String
    $filter: FilterInfoInput
    $recipients: RecipientInfoInput!
  ) {
    createProductsReport(
      input: {
        columns: $columns
        recipients: $recipients
        name: $name
        filter: $filter
      }
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

interface CreateProductsReportResponse {
  createProductsReport: ReportResponse
}

interface CreateProductsReportInput {
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

export function useMutationCreateProductsReport() {
  return useAppMutation<
    CreateProductsReportResponse,
    CreateProductsReportInput
  >(apiMutation)
}

export default useMutationCreateProductsReport
