import {
  OperationContext,
  OperationResult,
  UseMutationState,
  useMutation,
  TypedDocumentNode,
} from 'urql'
import { useTenant } from 'saleor-app-ui'

type AppFetchFunction<T, D> = (
  variables?: D | undefined,
  context?: Partial<OperationContext> | undefined
) => Promise<OperationResult<T, D>>
type AppData<T, D> = UseMutationState<T, D>

export function useAppMutation<T, D>(
  query: string | TypedDocumentNode<T, D>
): [AppData<T, D>, AppFetchFunction<T, D>] {
  const [data, fetchFunction] = useMutation<T, D>(query)
  const { appUrl, saleorDomain, saleorToken } = useTenant()

  const appFetchFunction = (
    variables?: D,
    context?: Partial<OperationContext>
  ) =>
    fetchFunction(variables, {
      url: `${appUrl}/v1/graphql`,
      fetchOptions: {
        headers: {
          'X-Saleor-Domain': saleorDomain,
          'X-Saleor-Token': saleorToken,
        },
      },
      ...context,
    })

  return [data, appFetchFunction]
}

export default useAppMutation
