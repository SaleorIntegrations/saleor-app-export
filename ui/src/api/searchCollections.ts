import { useQuery } from 'urql'

const apiQuery = `
  query SearchCollections($after: String, $first: Int!, $query: String!) {
    search: collections(
      after: $after
      first: $first
      filter: { search: $query }
    ) {
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

interface SearchCollections {
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

export function useQuerySearchCollections(variables: Variables, options?: any) {
  return useQuery<SearchCollections>({
    query: apiQuery,
    variables: {
      after: variables.after ? variables.after : '',
      first: variables.first ? variables.first : 5,
      query: variables.query ? variables.query : '',
    },
    ...options,
  })
}

export default useQuerySearchCollections
