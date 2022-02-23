import { gql } from 'urql'

import { ReportErrorFragment } from '../../../../../common/api/export/fragments'
import { DeleteReportResponse as DeleteReport } from '../../../../../common/api/export/types'
import { useAppMutation } from '../../../../../common/api/export/useAppMutation'

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
