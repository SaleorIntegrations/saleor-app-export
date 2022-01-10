import { useQuery } from 'urql'

const apiQuery = `
  query GridAttributes($ids: [ID!]!) {
    grid: attributes(first: 25, filter: {ids: $ids}) {
      edges {
        node {
          id
          name
          __typename
        }
        __typename
      }
      __typename
    }
  }
`

interface GridQueryAttributes {
  grid: {
    edges: {
      node: {
        id: string
        name: string
        __typename: string
      }
      __typename: string
    }[]
  }
}

export function useQueryGridAttributes(ids: string[]) {
  return useQuery<GridQueryAttributes>({
    query: apiQuery,
    variables: {
      ids: ids,
    },
  })
}

export default useQueryGridAttributes
