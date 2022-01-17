import {
  OperationContext,
  OperationResult,
  UseMutationState,
  useMutation,
  TypedDocumentNode,
} from 'urql'

type AppFetchFunction<T, D> = (
  variables?: D | undefined,
  context?: Partial<OperationContext> | undefined
) => Promise<OperationResult<T, D>>
type AppData<T, D> = UseMutationState<T, D>

export function useAppMutation<T, D>(
  query: string | TypedDocumentNode<T, D>
): [AppData<T, D>, AppFetchFunction<T, D>] {
  const [data, fetchFunction] = useMutation<T, D>(query)

  const appFetchFunction = (
    variables?: D,
    context?: Partial<OperationContext>
  ) =>
    fetchFunction(variables, {
      url: `${process.env.REACT_APP_APP_URL}/graphql`,
      ...context,
    })

  return [data, appFetchFunction]
}

export default useAppMutation
