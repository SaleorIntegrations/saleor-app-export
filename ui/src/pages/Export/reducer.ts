import produce from 'immer'

import { FileType, ExportObjectTypesEnum as ExportType, ProductExport, OrderExport } from '../../globalTypes'

export interface Export {
  fileType: FileType
  exportType: ExportType
  exportProductData: ProductExport
  exportOrderData: OrderExport
}

export interface ExportAction extends Partial<Export> {
  type: 'SET_FILE_TYPE' | 'SET_EXPORT_PRODUCT_DATA' | 'SET_EXPORT_TYPE'
}

export const initialExport: Export = {
  exportProductData: {
    name: '',
    filter: '',
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
    name: ''
  },
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
    default:
      return state
  }
}
