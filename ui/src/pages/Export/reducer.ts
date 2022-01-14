import produce from 'immer'

import { FileType, ExportObjectTypesEnum as ExportType, ProductExport, OrderExport } from '../../globalTypes'

export interface Export {
  fileType: FileType
  name: string
  id: number | null
  exportType: ExportType
  exportProductData: ProductExport
  exportOrderData: OrderExport
}

export interface ExportAction extends Partial<Export> {
  type: 'SET_FILE_TYPE' | 'SET_EXPORT_PRODUCT_DATA' | 'SET_EXPORT_TYPE' | 'SET_EXPORT_ORDER_DATA' | 'SET_ID' | 'SET_NAME'
}

export const initialExport: Export = {
  exportProductData: {
    filter: null,
    exportInfo: {
      attributes: [],
      channels: [],
      fields: {
        seo: [],
        inventory: [],
        financials: [],
        organisations: []
      },
      warehouses: [],
    },
  },
  exportOrderData: {
    filter: null,
    exportInfo: {
      fields: {
        basic: [],
        financial: [],
        fulfillments: [],
        items: [],
        customer: [],
        payments: []
      }
    }
  },
  name: '',
  id: null,
  fileType: FileType.CSV,
  exportType: ExportType.PRODUCTS
}

export const exportReducer = (state: Export, action: ExportAction) => {
  switch (action.type) {
    case 'SET_EXPORT_TYPE':
      return produce(state, draft => {
        const { exportType } = action
        draft.exportType = exportType !== undefined ? exportType : state.exportType
      })
    case 'SET_FILE_TYPE':
      return produce(state, draft => {
        const { fileType } = action
        draft.fileType = fileType !== undefined ? fileType : state.fileType
      })
    case 'SET_EXPORT_PRODUCT_DATA':
      return produce(state, draft => {
        const { exportProductData } = action
        draft.exportProductData = exportProductData !== undefined ? exportProductData : state.exportProductData
      })
    case 'SET_EXPORT_ORDER_DATA':
      return produce(state, draft => {
        const { exportOrderData } = action
        draft.exportOrderData = exportOrderData !== undefined ? exportOrderData : state.exportOrderData
      })
    case 'SET_ID':
      return produce(state, draft => {
        const { id } = action
        draft.id = id !== undefined ? id : state.id
      })
    case 'SET_NAME':
      return produce(state, draft => {
        const { name } = action
        draft.name = name !== undefined ? name : state.name
      })
    default:
      return state
  }
}
