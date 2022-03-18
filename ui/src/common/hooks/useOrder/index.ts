import create from 'zustand'
import { produce } from 'immer'

import { OrderFieldEnum } from '../../api/export/types'

export type OrderSelectedColumnsInfo = {
  orderFields: OrderFieldEnum[]
}
export interface OrderStore {
  columns: OrderSelectedColumnsInfo
  setColumns: (columns: OrderSelectedColumnsInfo) => void
  setOrderFields: (orderFields: OrderFieldEnum[]) => void
  reset: () => void
}

export const useOrder = create<OrderStore>(set => ({
  columns: {
    orderFields: [],
  },
  setColumns: columns => set({ columns: columns }),
  setOrderFields: orderFields =>
    set(state =>
      produce(state, draft => {
        draft.columns.orderFields = orderFields
      })
    ),
  reset: () =>
    set({
      columns: {
        orderFields: [],
      },
    }),
}))

export default useOrder
