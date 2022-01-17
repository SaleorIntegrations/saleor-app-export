import { useMutation, gql } from 'urql'

import { ReportFragment, ReportErrorFragment } from '../../export/fragments'
import { ReportResponse, OrderFieldEnum, FilterInfo } from '../../export/types'

const apiMutation = gql`
  ${ReportFragment}
  ${ReportErrorFragment}
  mutation updateOrdersReport($fields: [OrderFieldEnum!]!, $name: String, $filter: OrderFilterInfo, $reportId: Int!) {
    updateOrdersReport(input: { columns: { fields: $fields }, name: $name, filter: $filter }, reportId: $reportId) {
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

interface UpdateOrderReportResponse {
  updateOrdersReport: ReportResponse
}

interface UpdateOrderReportInput {
  fields: OrderFieldEnum[]
  name?: string
  filter?: FilterInfo
  reportId: number
}

export function useMutationUpdateOrderReport() {
  return useMutation<UpdateOrderReportResponse, UpdateOrderReportInput>(apiMutation)
}

export default useMutationUpdateOrderReport
