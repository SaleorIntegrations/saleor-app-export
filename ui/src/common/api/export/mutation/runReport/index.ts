import { gql } from 'urql'

import { JobFragment } from '../../fragments'
import { RunReportResponse as RunReport } from '../../types'
import { useAppMutation } from '../../useAppMutation'

const apiMutation = gql`
  ${JobFragment}
  mutation runReport($reportId: Int!) {
    runReport(reportId: $reportId) {
      job {
        ...JobFragment
      }
    }
  }
`

interface RunReportResponse {
  runReport: RunReport
}

interface RunReportInput {
  reportId: number
}

export function useMutationRunReport() {
  return useAppMutation<RunReportResponse, RunReportInput>(apiMutation)
}

export default useMutationRunReport
