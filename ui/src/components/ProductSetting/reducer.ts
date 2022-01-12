import produce from 'immer'

import { ProductExport } from '../../globalTypes'

export interface ProductExportAction extends Partial<ProductExport> {
  type: 'SET_NAME' | 'SET_EXPORT_INFO' | 'SET_FILE_TYPE' | 'SET_FILTER'
}

export const initialProductExport: ProductExport = {
  name: "",
  exportInfo: {
    attributes: [],
    channels: [],
    fields: [],
    warehouses: []
  },
  filter: ""
}

export const productExportReducer = (state: ProductExport, action: ProductExportAction) => {
  switch (action.type) {
    case 'SET_NAME':
      return produce(state, draft => {
        const { name } = action
        draft.name = name!== undefined ? name : state.name
      })
    case 'SET_EXPORT_INFO':
      return produce(state, draft => {
        const { exportInfo } = action
        draft.exportInfo = exportInfo !== undefined ? exportInfo : state.exportInfo
      })
    case 'SET_FILTER':
      return produce(state, draft => {
        const { filter } = action
        draft.filter = filter !== undefined ? filter : state.filter
      })
    default:
      return state
  }
}
