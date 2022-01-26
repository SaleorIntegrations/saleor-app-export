import { useQuery, gql } from 'urql'
import { useTenant } from 'saleor-app-ui'

import { PageInfoFragment, GroupFragment } from '../fragments'
import { Group, PageInfo, Node } from '../types'
import { useMemo } from 'react'

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
  const { saleorDomain, saleorToken } = useTenant()
  return useQuery<PermissionGroupsResponse>({
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

export default useQueryPermissionGroups
