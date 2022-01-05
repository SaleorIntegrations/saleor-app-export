import produce from 'immer'

import { ExportInfo, FileType } from '../../globalTypes'

export interface ProductExport {
  name: string,
  exportInfo: ExportInfo
  fileType: FileType
  filter: string
}

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
  fileType: FileType.CSV,
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
    case 'SET_FILE_TYPE':
      return produce(state, draft => {
        const { fileType } = action
        draft.fileType = fileType !== undefined ? fileType : state.fileType
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
