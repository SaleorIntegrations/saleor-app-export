import produce from 'immer'

import { FilterInfo, ProductSelectedColumnsInfo, OrderSelectedColumnsInfo, ExportObjectTypesEnum } from '../../api/export/types'

import { FileType } from '../../globalTypes'

export interface Export {
  fileType: FileType
  name: string
  id: number | null
  type: ExportObjectTypesEnum
  filter: FilterInfo | null
  columns: ProductSelectedColumnsInfo | OrderSelectedColumnsInfo
}

export interface ExportAction extends Partial<Export> {
  action: 'SET_FILE_TYPE' | 'SET_NAME' | 'SET_ID' | 'SET_TYPE' | 'SET_FILTER' | 'SET_COLUMNS' | 'SET_EXPORT'
  export?: Export
}

export const initialExport: Export = {
  fileType: FileType.CSV,
  name: '',
  id: null,
  type: ExportObjectTypesEnum.PRODUCTS,
  filter: null,
  columns: {
    productFields: [],
    attributes: [],
    channels: [],
    warehouses: [],
  }
}

export const exportReducer = (state: Export, action: ExportAction) => {
  switch (action.action) {
    case 'SET_COLUMNS':
      return produce(state, draft => {
        const { columns } = action
        draft.columns = columns !== undefined ? columns : state.columns
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
    case 'SET_TYPE':
      return produce(state, draft => {
        const { type } = action
        draft.type = type !== undefined ? type : state.type
      })
    case 'SET_EXPORT':
      return action.export !== undefined ? action.export : state
    default:
      return state
  }
}
