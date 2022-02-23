import { gql } from 'urql'

import {
  ReportFragment,
  ReportErrorFragment,
} from '../../../../../common/api/export/fragments'
import {
  ReportResponse,
  OrderFieldEnum,
  FilterInfo,
  RecipientInfo,
} from '../../../../../common/api/export/types'
import { useAppMutation } from '../../../../../common/api/export/useAppMutation'

const apiMutation = gql`
  ${ReportFragment}
  ${ReportErrorFragment}
  mutation updateOrdersReport(
    $fields: [OrderFieldEnum!]!
    $name: String
    $filter: FilterInfoInput
    $reportId: Int!
    $recipients: RecipientInfoInput!
  ) {
    updateOrdersReport(
      input: {
        columns: { fields: $fields }
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

interface UpdateOrderReportResponse {
  updateOrdersReport: ReportResponse
}

interface UpdateOrderReportInput {
  fields: OrderFieldEnum[]
  name?: string
  filter?: FilterInfo
  reportId: number
  recipients: RecipientInfo
}

export function useMutationUpdateOrderReport() {
  return useAppMutation<UpdateOrderReportResponse, UpdateOrderReportInput>(
    apiMutation
  )
}

export default useMutationUpdateOrderReport
