import create from 'zustand'
import { produce } from 'immer'

import {
  ProductFieldEnum,
  ProductSelectedColumnsInfo,
} from '../../api/export/types'

export interface ProductData {
  columns: ProductSelectedColumnsInfo
}

export interface ProductStore extends ProductData {
  setChannels: (channels: string[]) => void
  setAttributes: (attributes: string[]) => void
  setWarehouses: (warehouses: string[]) => void
  setProductFields: (productFields: ProductFieldEnum[]) => void
  reset: (data?: ProductData) => void
}

export const useProduct = create<ProductStore>(set => ({
  columns: {
    attributes: [],
    channels: [],
    warehouses: [],
    productFields: [],
  },
  setAttributes: attributes =>
    set(state =>
      produce(state, draft => {
        draft.columns.attributes = attributes
      })
    ),
  setChannels: channels =>
    set(state =>
      produce(state, draft => {
        draft.columns.channels = channels
      })
    ),
  setWarehouses: warehouses =>
    set(state =>
      produce(state, draft => {
        draft.columns.warehouses = warehouses
      })
    ),
  setProductFields: productFields =>
    set(state =>
      produce(state, draft => {
        draft.columns.productFields = productFields
      })
    ),
  reset: data =>
    set(() => ({
      columns: {
        attributes: [],
        channels: [],
        warehouses: [],
        productFields: [],
      },
      ...data,
    })),
}))

export default useProduct
