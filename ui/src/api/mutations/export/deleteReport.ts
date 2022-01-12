import { useMutation } from 'urql'

import { ReportErrorCode } from '../../../globalTypes'

const apiMutation = `
  mutation deleteReport($reportId: Int!) {
    deleteReport(reportId: $reportId) {
      errors {
        code
        message
        field
      }
      __typename
  }
  }
`

interface DeleteReport {
  deleteReport: {
    errors: {
      code: ReportErrorCode,
      message: string
      field: string
    }[]
    __typename: string
  }
}

interface DeleteReportInput {
  reportId: number
}

export function useMutationDeleteReport() {
  return useMutation<DeleteReport, DeleteReportInput>(apiMutation)
}

export default useMutationDeleteReport
