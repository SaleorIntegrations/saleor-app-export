import { createClient } from 'urql'

export const apiClient = createClient({
  url: `${process.env.REACT_APP_SALEOR_URL}/graphql/`,
  fetchOptions: () => {
    const token = process.env.REACT_APP_SALEOR_TOKEN

    return {
      headers: {
        authorization: token ? `JWT ${token}` : '',
      },
    }
  },
})

export default apiClient
