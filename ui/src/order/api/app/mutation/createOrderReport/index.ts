import { gql } from 'urql'

import {
  ReportFragment,
  ReportErrorFragment,
} from '../../../../../common/api/export/fragments'
import {
  ReportResponse,
  FilterInfo,
  OrderFieldEnum,
  RecipientInfo,
} from '../../../../../common/api/export/types'
import { useAppMutation } from '../../../../../common/api/export/useAppMutation'

const apiMutation = gql`
  ${ReportFragment}
  ${ReportErrorFragment}
  mutation createOrdersReport(
    $fields: [OrderFieldEnum!]!
    $name: String
    $filter: FilterInfoInput
    $recipients: RecipientInfoInput!
  ) {
    createOrdersReport(
      input: {
        columns: { fields: $fields }
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

interface CreateOrdersReportResponse {
  createOrdersReport: ReportResponse
}

interface ExportOrderInput {
  fields: OrderFieldEnum[]
  name?: string
  filter?: FilterInfo
  recipients: RecipientInfo
}

export function useMutationCreateOrdersReport() {
  return useAppMutation<CreateOrdersReportResponse, ExportOrderInput>(
    apiMutation
  )
}

export default useMutationCreateOrdersReport
