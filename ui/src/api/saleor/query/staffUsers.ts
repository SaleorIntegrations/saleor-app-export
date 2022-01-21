import { useQuery, gql } from 'urql'

import { PageInfoFragment, UserFragment } from '../fragments'
import { User, PageInfo } from '../types'

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
  after?: string
  search?: string
}

export function useQueryStaffUsers(variables: Variables, options?: any) {
  return useQuery<StaffUserResponse>({
    query: apiQuery,
    variables: variables,
    ...options,
  })
}

export default useQueryStaffUsers
