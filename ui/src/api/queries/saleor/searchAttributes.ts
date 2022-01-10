import { useQuery } from 'urql'

const apiQuery = `
  query SearchAttributes($after: String, $first: Int!, $query: String!) {
    search: attributes(after: $after, first: $first, filter: {search: $query}) {
      edges {
        node {
          id
          name
          slug
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

interface SearchAttributes {
  search: {
    edges: {
      node: {
        id: string
        name: string
        slug: string
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

export function useQuerySearchAttributes(variables: Variables, options?: any) {
  return useQuery<SearchAttributes>({
    query: apiQuery,
    variables: {
      after: variables.after ? variables.after : '',
      first: variables.first ? variables.first : 5,
      query: variables.query ? variables.query : '',
    },
    ...options,
  })
}

export default useQuerySearchAttributes
