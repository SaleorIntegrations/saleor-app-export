import { useContext } from 'react'
import { produce } from 'immer'

import {
  ProductFieldEnum,
  ExportObjectTypesEnum,
  ProductSelectedColumnsInfo,
} from '../api/export/types'
import { ExportContext } from '../context/ExportContext'
import { FileType } from '../globalTypes'

export const useExportProduct = () => {
  const { state, dispatch, isLoading } = useContext(ExportContext)

  if (!state) {
    throw new Error('Export order provider is not set')
  }

  if (!('productFields' in state.columns)) {
    throw new Error('Export Context is type of Order')
  }
  const setAttributes = (attributes: string[]) =>
    dispatch({
      action: 'SET_COLUMNS',
      columns: produce(state.columns as ProductSelectedColumnsInfo, draft => {
        draft.attributes = attributes
      }),
    })
  const setWarehouses = (warehouses: string[]) =>
    dispatch({
      action: 'SET_COLUMNS',
      columns: produce(state.columns as ProductSelectedColumnsInfo, draft => {
        draft.warehouses = warehouses
      }),
    })
  const setChannels = (channels: string[]) =>
    dispatch({
      action: 'SET_COLUMNS',
      columns: produce(state.columns as ProductSelectedColumnsInfo, draft => {
        draft.channels = channels
      }),
    })
  const setProductFields = (productFields: ProductFieldEnum[]) =>
    dispatch({
      action: 'SET_COLUMNS',
      columns: produce(state.columns as ProductSelectedColumnsInfo, draft => {
        draft.productFields = productFields
      }),
    })
  const setFileType = (fileType: FileType) =>
    dispatch({ action: 'SET_FILE_TYPE', fileType: fileType })
  const setFilter = (filterStr: string) =>
    dispatch({ action: 'SET_FILTER', filter: { filterStr: filterStr } })
  const setId = (id: number) => dispatch({ action: 'SET_ID', id: id })
  const setName = (name: string) => dispatch({ action: 'SET_NAME', name: name })
  const setType = (type: ExportObjectTypesEnum) =>
    dispatch({ action: 'SET_TYPE', type: type })

  return {
    ...state,
    setAttributes,
    setWarehouses,
    setChannels,
    setProductFields,
    setFileType,
    setFilter,
    setId,
    setName,
    setType,
    columns: state.columns,
    isLoading,
  }
}

export default useExportProduct
