import create from 'zustand'

import { ExportObjectTypesEnum } from '../api/export/types'
import { ExportCommonStore, FileType } from '../globalTypes'

export const useExportCommonStore = create<ExportCommonStore>(set => ({
  fileType: FileType.CSV,
  name: '',
  id: null,
  type: ExportObjectTypesEnum.PRODUCTS,
  filter: null,
  initialize: data => set(state => data),
  setFileType: fileType => set(state => ({ fileType: fileType })),
  setName: name => set(state => ({ name: name })),
  setId: id => set(state => ({ id: id })),
  setFilter: filter =>
    set(state => {
      if (!filter) return { filter: null }
      return { filter: { filterStr: filter } }
    }),
  reset: () =>
    set(state => ({
      fileType: FileType.CSV,
      name: '',
      id: null,
      filter: null,
    })),
}))

export default useExportCommonStore
