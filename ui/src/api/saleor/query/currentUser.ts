import { useQuery, gql } from 'urql'

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
  return useQuery<CurrentUserResponse>({
    query: apiQuery,
    ...options,
  })
}

export default useCurrentUserQuery
