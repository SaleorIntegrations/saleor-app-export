import { useMutation, gql } from 'urql'

import { ReportFragment, ReportErrorFragment } from '../fragments'
import { ReportResponse, FilterInfo, OrderFieldEnum } from '../types'

const apiMutation = gql`
  ${ReportFragment}
  ${ReportErrorFragment}
  mutation createOrdersReport($fields: [OrderFieldEnum!]!, $name: String, $filter: OrderFilterInfo) {
    createOrdersReport(input: { columns: { fields: $fields }, name: $name, filter: $filter }) {
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

interface CreateOrdersReportResponse {
  createOrdersReport: ReportResponse
}

interface ExportOrderInput {
  fields: OrderFieldEnum[]
  name?: string
  filter?: FilterInfo
}

export function useMutationCreateOrdersReport() {
  return useMutation<CreateOrdersReportResponse, ExportOrderInput>(apiMutation)
}

export default useMutationCreateOrdersReport
