import { useMutation, gql } from 'urql'

import { JobFragment } from '../../export/fragments'
import { RunReportResponse as RunReport } from '../../export/types'

const apiMutation = gql`
  ${JobFragment}
  mutation runReport($reportId: Int!) {
    runReport(reportId: $reportId) {
      job {
        ...JobFragment
      }
      __typename
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
  return useMutation<RunReportResponse, RunReportInput>(apiMutation)
}

export default useMutationRunReport
