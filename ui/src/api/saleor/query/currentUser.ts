import { useMemo } from 'react'
import { useQuery, gql } from 'urql'
import { useTenant } from 'saleor-app-ui'

import { UserFragment } from '../fragments'
import { User } from '../types'

const apiQuery = gql`
  ${UserFragment}
  query {
    me {
      ...UserFragment
    }
  }
`

interface CurrentUserResponse {
  me: User
}

export function useCurrentUserQuery(options?: any) {
  const { saleorDomain, saleorToken } = useTenant()
  return useQuery<CurrentUserResponse>({
    query: apiQuery,
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

export default useCurrentUserQuery
