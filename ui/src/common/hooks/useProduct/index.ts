import create from 'zustand'

import {
  ProductFieldEnum,
  ProductSelectedColumnsInfo,
} from '../../api/export/types'
import productFields from '../../../product/utils/productFields'
import { immer } from '../../../zustand'

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

const initState: ProductData = {
  columns: {
    attributes: [],
    channels: [],
    warehouses: [],
    productFields: [],
  },
}

export const useProduct = create<ProductStore>(
  immer((set, get) => ({
    columns: initState.columns,
    setAttributes: attributes =>
      set(state => void (state.columns.attributes = attributes)),
    setChannels: channels =>
      set(state => void (state.columns.channels = channels)),
    setWarehouses: warehouses =>
      set(state => void (state.columns.warehouses = warehouses)),
    setProductFields: productFields =>
      set(state => void (state.columns.productFields = productFields)),
    setSpecificFields: (key, fields) =>
      set(state => {
        const notSpecificFields = state.columns.productFields.filter(
          field => !productFields[key].includes(field)
        )
        state.columns.productFields = [...fields, ...notSpecificFields]
      }),
    getSpecificFields: key =>
      get().columns.productFields.filter(field =>
        productFields[key].includes(field)
      ),
    reset: data =>
      set(() => ({
        ...initState,
        ...data,
      })),
  }))
)

export default useProduct
