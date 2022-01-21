import { gql } from 'urql'

import { ReportFragment, ReportErrorFragment } from '../../export/fragments'
import {
  ReportResponse,
  FilterInfo,
  ProductFieldEnum,
} from '../../export/types'
import { useAppMutation } from '../useAppMutation'

const apiMutation = gql`
  ${ReportFragment}
  ${ReportErrorFragment}
  mutation createProductsReport(
    $columns: ProductSelectedColumnsInput!
    $name: String
    $filter: ProductFilterInfo
  ) {
    createProductsReport(
      input: { columns: $columns, name: $name, filter: $filter }
    ) {
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
}

export function useMutationCreateProductsReport() {
  return useAppMutation<
    CreateProductsReportResponse,
    CreateProductsReportInput
  >(apiMutation)
}

export default useMutationCreateProductsReport
