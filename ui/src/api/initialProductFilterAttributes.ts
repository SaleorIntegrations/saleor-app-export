import { useQuery } from 'urql'

const apiQuery = `
  query InitialProductFilterAttributes {
    attributes(
      first: 100
      filter: {filterableInDashboard: true, type: PRODUCT_TYPE}
    ) {
      edges {
        node {
          id
          name
          inputType
          slug
          __typename
        }
        __typename
      }
      __typename
    }
  }
`

interface InitialProductFilterAttributes {
  attributes: {
    edges: {
      node: {
        id: string
        name: string
        inputType: string
        slug: string
        __typename: string
      }
      __typename: string
    }[]
  }
}

export function useQueryInitialProductFilterAttributes(options?: any) {
  return useQuery<InitialProductFilterAttributes>({
    query: apiQuery,
    ...options,
  })
}

export default useQueryInitialProductFilterAttributes
