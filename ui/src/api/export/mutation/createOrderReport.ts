import { gql } from 'urql'

import { ReportFragment, ReportErrorFragment } from '../fragments'
import { ReportResponse, FilterInfo, OrderFieldEnum } from '../types'
import { useAppMutation } from '../useAppMutation'

const apiMutation = gql`
  ${ReportFragment}
  ${ReportErrorFragment}
  mutation createOrdersReport(
    $fields: [OrderFieldEnum!]!
    $name: String
    $filter: OrderFilterInfo
  ) {
    createOrdersReport(
      input: { columns: { fields: $fields }, name: $name, filter: $filter }
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

interface CreateOrdersReportResponse {
  createOrdersReport: ReportResponse
}

interface ExportOrderInput {
  fields: OrderFieldEnum[]
  name?: string
  filter?: FilterInfo
}

export function useMutationCreateOrdersReport() {
  return useAppMutation<CreateOrdersReportResponse, ExportOrderInput>(
    apiMutation
  )
}

export default useMutationCreateOrdersReport
