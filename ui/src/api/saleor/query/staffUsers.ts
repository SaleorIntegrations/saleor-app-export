import { useQuery, gql } from 'urql'
import { useTenant } from 'saleor-app-ui'

import { PageInfoFragment, UserFragment } from '../fragments'
import { User, PageInfo } from '../types'
import { useMemo } from 'react'

const apiQuery = gql`
  ${PageInfoFragment}
  ${UserFragment}
  query getStaff($first: Int, $after: String, $search: String) {
    staffUsers(first: $first, after: $after, filter: { search: $search }) {
      edges {
        cursor
        node {
          ...UserFragment
        }
      }
      pageInfo {
        ...PageInfoFragment
      }
    }
  }
`

interface StaffUserResponse {
  staffUsers: {
    edges: {
      node: User
      cursor: string
    }[]
    pageInfo: PageInfo
  }
}

interface Variables {
  first: number
  after?: string | null
  search?: string
}

export function useQueryStaffUsers(variables: Variables, options?: any) {
  const { saleorDomain, saleorToken } = useTenant()
  return useQuery<StaffUserResponse>({
    query: apiQuery,
    variables: variables,
    context: useMemo(
      () => ({
        url: `http://${saleorDomain}/graphql/`,
        fetchOptions: {
          headers: {
            authorization: `JWT ${saleorToken}`,
          },
        },
      }),
      [saleorDomain, saleorToken]
    ),
    ...options,
  })
}

export default useQueryStaffUsers
