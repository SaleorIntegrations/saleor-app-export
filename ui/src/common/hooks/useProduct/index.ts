import create from 'zustand'
import { produce } from 'immer'

import {
  ProductFieldEnum,
  ProductSelectedColumnsInfo,
} from '../../api/export/types'
import productFields from '../../../product/utils/productFields'

export interface ProductData {
  columns: ProductSelectedColumnsInfo
}
export type ProductFieldsKey = keyof typeof productFields
export interface ProductStore extends ProductData {
  setChannels: (channels: string[]) => void
  setAttributes: (attributes: string[]) => void
  setWarehouses: (warehouses: string[]) => void
  setProductFields: (productFields: ProductFieldEnum[]) => void
  setSpecificFields: (key: ProductFieldsKey, fields: ProductFieldEnum[]) => void
  getSpecificFields: (key: ProductFieldsKey) => ProductFieldEnum[]
  reset: (data?: ProductData) => void
}

export const useProduct = create<ProductStore>((set, get) => ({
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
  setSpecificFields: (key, fields) =>
    set(state => {
      const notSpecificFields = state.columns.productFields.filter(
        field => !productFields[key].includes(field)
      )
      return produce(state, draft => {
        draft.columns.productFields = [...fields, ...notSpecificFields]
      })
    }),
  getSpecificFields: key =>
    get().columns.productFields.filter(field =>
      productFields[key].includes(field)
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
