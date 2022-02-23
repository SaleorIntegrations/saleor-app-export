import create from 'zustand'

import { ExportObjectTypesEnum } from '../../api/export/types'
import { ExportCommonStore, FileType } from '../../../globalTypes'

export const useExportCommonStore = create<ExportCommonStore>(set => ({
  fileType: FileType.CSV,
  name: '',
  id: null,
  type: ExportObjectTypesEnum.PRODUCTS,
  filter: null,
  recipients: {
    addMore: false,
    users: [],
    permissionGroups: [],
  },
  initialize: data => set(data),
  setFileType: fileType => set({ fileType: fileType }),
  setName: name => set({ name: name }),
  setRecipients: recipients => set({ recipients: recipients }),
  setId: id => set({ id: id }),
  setFilter: filter =>
    set(() => {
      if (!filter) return { filter: null }
      return { filter: { filterStr: filter } }
    }),
  reset: currentUser =>
    set({
      fileType: FileType.CSV,
      name: '',
      id: null,
      filter: null,
      recipients: {
        addMore: false,
        users: [currentUser.id],
        permissionGroups: [],
      },
    }),
}))

export default useExportCommonStore
