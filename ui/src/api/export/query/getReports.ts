import { useMemo } from 'react'
import { useQuery, gql } from 'urql'

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
  return useQuery<ReportsResponse>({
    query: apiQuery,
    variables: variables,
    ...options,
    context: useMemo(
      () => ({ url: `${process.env.REACT_APP_APP_URL}/graphql/` }),
      []
    ),
  })
}

export default useQueryReports
