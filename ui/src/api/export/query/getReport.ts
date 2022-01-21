import { useMemo } from 'react'
import { useQuery, gql } from 'urql'

import { ReportFragment } from '../fragments'
import { Report } from '../types'

const apiQuery = gql`
  ${ReportFragment}
  query getReport($reportId: Int!) {
    report(id: $reportId) {
      ...ReportFragment
    }
  }
`

interface ReportResponse {
  report: Report
}

interface Variables {
  reportId: number
}

export function useQueryReport(variables: Variables, options?: any) {
  return useQuery<ReportResponse>({
    query: apiQuery,
    variables: variables,
    ...options,
    context: useMemo(
      () => ({ url: `${process.env.REACT_APP_APP_URL}/graphql/` }),
      []
    ),
  })
}

export default useQueryReport
