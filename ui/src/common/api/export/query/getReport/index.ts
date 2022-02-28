import { useMemo } from 'react'
import { useQuery, gql } from 'urql'
import { useTenant } from 'saleor-app-ui'

import { ReportFragment } from '../../fragments'
import { Report } from '../../types'

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
  const { appUrl, saleorDomain, saleorToken } = useTenant()

  return useQuery<ReportResponse>({
    query: apiQuery,
    variables: variables,
    ...options,
    context: useMemo(
      () => ({
        url: `${appUrl}/graphql/`,
        fetchOptions: () => ({
          headers: {
            'X-Saleor-Domain': saleorDomain,
            'X-Saleor-Token': saleorToken,
          },
        }),
      }),
      [appUrl, saleorDomain, saleorToken]
    ),
  })
}

export default useQueryReport
