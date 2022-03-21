import create from 'zustand'
import { produce } from 'immer'

import { OrderFieldEnum } from '../../api/export/types'

export type OrderSelectedColumnsInfo = {
  orderFields: OrderFieldEnum[]
}
export interface OrderData {
  columns: OrderSelectedColumnsInfo
}
export interface OrderStore extends OrderData {
  setColumns: (columns: OrderSelectedColumnsInfo) => void
  setOrderFields: (orderFields: OrderFieldEnum[]) => void
  reset: (data?: OrderData) => void
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
  reset: data =>
    set({
      columns: {
        orderFields: [],
        ...data,
      },
    }),
}))

export default useOrder
