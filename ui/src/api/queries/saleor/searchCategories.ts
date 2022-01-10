import { useQuery } from 'urql'

const apiQuery = `
  query SearchCategories($after: String, $first: Int!, $query: String!) {
    search: categories(after: $after, first: $first, filter: {search: $query}) {
      edges {
        node {
          id
          name
          __typename
        }
        __typename
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
        __typename
      }
      __typename
    }
  }
`

interface SearchCategories {
  search: {
    edges: {
      node: {
        id: string
        name: string
        __typename: string
      }
      __typename: string
    }[]
    pageInfo: {
      endCursor: string
      hasNextPage: boolean
      hasPreviousPage: boolean
      startCursor: string
      __typename: string
    }
    __typename: string
  }
}

interface Variables {
  after: string
  first: number
  query?: string
}

export function useQuerySearchCategories(variables: Variables, options?: any) {
  return useQuery<SearchCategories>({
    query: apiQuery,
    variables: {
      after: variables.after ? variables.after : '',
      first: variables.first ? variables.first : 5,
      query: variables.query ? variables.query : '',
    },
    ...options,
  })
}

export default useQuerySearchCategories
