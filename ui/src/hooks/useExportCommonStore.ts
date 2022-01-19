import create from 'zustand'

import { ExportObjectTypesEnum } from '../api/export/types'
import { ExportCommonStore, FileType } from '../globalTypes'

export const useExportCommonStore = create<ExportCommonStore>(set => ({
  fileType: FileType.CSV,
  name: '',
  id: null,
  type: ExportObjectTypesEnum.PRODUCTS,
  filter: null,
  setFileType: fileType => set(state => ({ fileType: fileType })),
  setName: name => set(state => ({ name: name })),
  setId: id => set(state => ({ id: id })),
  setType: type => set(state => ({ type: type })),
  setFilter: filter =>
    set(state => {
      if (!filter) return { filter: null }
      return { filter: { filterStr: filter } }
    }),
  clear: () =>
    set(state => ({
      fileType: FileType.CSV,
      name: '',
      id: null,
      type: ExportObjectTypesEnum.PRODUCTS,
      filter: null,
    })),
}))

export default useExportCommonStore
