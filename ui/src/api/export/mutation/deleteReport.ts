import { gql } from 'urql'

import { ReportErrorFragment } from '../../export/fragments'
import { DeleteReportResponse as DeleteReport } from '../../export/types'
import { useAppMutation } from '../useAppMutation'

const apiMutation = gql`
  ${ReportErrorFragment}
  mutation deleteReport($reportId: Int!) {
    deleteReport(reportId: $reportId) {
      errors {
        ...ReportErrorFragment
      }
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
  return useAppMutation<DeleteReportResponse, DeleteReportInput>(apiMutation)
}

export default useMutationDeleteReport
