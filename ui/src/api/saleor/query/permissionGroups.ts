import { useQuery, gql } from 'urql'

import { PageInfoFragment, GroupFragment } from '../fragments'
import { Group, PageInfo, Node } from '../types'

const apiQuery = gql`
  ${PageInfoFragment}
  ${GroupFragment}
  query permissionGroups($first: Int, $after: String) {
    permissionGroups(first: $first, after: $after) {
      edges {
        node {
          ...GroupFragment
        }
      }
      pageInfo {
        ...PageInfoFragment
      }
    }
  }
`

interface PermissionGroupsResponse {
  permissionGroups: {
    edges: Node<Group>[]
    pageInfo: PageInfo
  }
}

interface Variables {
  first: number
  after?: string | null
}

export function useQueryPermissionGroups(variables: Variables, options?: any) {
  return useQuery<PermissionGroupsResponse>({
    query: apiQuery,
    variables: variables,
    ...options,
  })
}

export default useQueryPermissionGroups
