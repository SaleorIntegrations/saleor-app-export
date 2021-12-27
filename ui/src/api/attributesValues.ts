import { useQuery } from 'urql'

const apiQuery = `
  query SearchAttributeValues($id: ID, $after: String, $first: Int!, $query: String!) {
    attribute(id: $id) {
      id
      choices(after: $after, first: $first, filter: {search: $query}) {
        edges {
          node {
            id
            name
            slug
            file {
              url
              contentType
              __typename
            }
            reference
            richText
            boolean
            date
            dateTime
            value
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
      __typename
    }
  }
`

interface SearchAttributeValuesQuery {
  attribute: {
    id: string
    choices: {
      edges: {
        node: {
          boolean: boolean | null
          date: string | null
          dateTime: string | null
          file: string | null
          id: string
          name: string
          reference: string | null
          richText: string | null
          slug: string
          value: string
          __typename: string
        }
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
    __typename: string
  }
}

export function useSearchAttributeValuesQuery(
  id: string,
  after: string,
  first: number,
  query: string,
  options?: any
) {
  return useQuery<SearchAttributeValuesQuery>({
    query: apiQuery,
    variables: {
      id: id,
      after: after,
      first: first,
      query: query,
    },
    ...options,
  })
}

export default useSearchAttributeValuesQuery
