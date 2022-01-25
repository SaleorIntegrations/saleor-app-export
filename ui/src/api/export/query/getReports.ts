import { useMemo } from 'react'
import { useQuery, gql } from 'urql'
import { useTenant } from 'saleor-app-ui'

import { ReportEdgeFragment, PageInfoFragment } from '../../export/fragments'
import { ReportConnection } from '../../export/types'

const apiQuery = gql`
  ${ReportEdgeFragment}
  ${PageInfoFragment}
  query getReports($first: Int!, $after: String) {
    reports(first: $first, after: $after) {
      edges {
        ...ReportEdgeFragment
      }
      pageInfo {
        ...PageInfoFragment
      }
      totalCount
    }
  }
`

interface ReportsResponse {
  reports: ReportConnection
}

interface Variables {
  first: number
  after?: string | null
}

export function useQueryReports(variables: Variables, options?: any) {
  const { appUrl, saleorToken, saleorDomain } = useTenant()

  return useQuery<ReportsResponse>({
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

export default useQueryReports
