import create from 'zustand'
import { produce } from 'immer'

import { OrderFieldEnum } from '../../api/export/types'
import orderFields from '../../../order/utils/orderFields'

export type OrderSelectedColumnsInfo = {
  orderFields: OrderFieldEnum[]
}
export interface OrderData {
  columns: OrderSelectedColumnsInfo
}
export type OrderFieldsKey = keyof typeof orderFields
export interface OrderStore extends OrderData {
  setColumns: (columns: OrderSelectedColumnsInfo) => void
  setOrderFields: (orderFields: OrderFieldEnum[]) => void
  setSpecificFields: (key: OrderFieldsKey, fields: OrderFieldEnum[]) => void
  getSpecificFields: (key: OrderFieldsKey) => OrderFieldEnum[]
  reset: (data?: OrderData) => void
}

export const useOrder = create<OrderStore>((set, get) => ({
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
  setSpecificFields: (key, fields) =>
    set(state => {
      const notSpecificFields = state.columns.orderFields.filter(
        field => !orderFields[key].includes(field)
      )
      return produce(state, draft => {
        draft.columns.orderFields = [...fields, ...notSpecificFields]
      })
    }),
  getSpecificFields: key =>
    get().columns.orderFields.filter(field => orderFields[key].includes(field)),
  reset: data =>
    set({
      columns: {
        orderFields: [],
      },
      ...data,
    }),
}))

export default useOrder
