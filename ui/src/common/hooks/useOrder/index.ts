import create from 'zustand'

import { OrderFieldEnum } from '../../api/export/types'
import orderFields from '../../../order/utils/orderFields'
import { immer } from '../../../zustand'

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

const initState: OrderData = {
  columns: {
    orderFields: [],
  },
}

export const useOrder = create<OrderStore>(
  immer((set, get) => ({
    columns: {
      orderFields: [],
    },
    setColumns: columns => set(state => void (state.columns = columns)),
    setOrderFields: orderFields =>
      set(state => void (state.columns.orderFields = orderFields)),
    setSpecificFields: (key, fields) =>
      set(state => {
        const notSpecificFields = state.columns.orderFields.filter(
          field => !orderFields[key].includes(field)
        )
        state.columns.orderFields = [...fields, ...notSpecificFields]
      }),
    getSpecificFields: key =>
      get().columns.orderFields.filter(field =>
        orderFields[key].includes(field)
      ),
    reset: data => set(() => ({ ...initState, ...data })),
  }))
)

export default useOrder
