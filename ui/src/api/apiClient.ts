import { createClient } from 'urql'

export const apiClient = createClient({
  url: `${process.env.REACT_APP_APP_URL}/graphql`,
})

export default apiClient
