import { useMutation, gql } from 'urql'

import { ReportErrorFragment } from '../../export/fragments'
import { DeleteReportResponse as DeleteReport } from '../../export/types'

const apiMutation = gql`
  ${ReportErrorFragment}
  mutation deleteReport($reportId: Int!) {
    deleteReport(reportId: $reportId) {
      errors {
        ...ReportErrorFragment
      }
      __typename
    }
  }
`

interface DeleteReportResponse {
  deleteReport: DeleteReport
}

interface DeleteReportInput {
  reportId: number
}

export function useMutationDeleteReport() {
  return useMutation<DeleteReportResponse, DeleteReportInput>(apiMutation)
}

export default useMutationDeleteReport
