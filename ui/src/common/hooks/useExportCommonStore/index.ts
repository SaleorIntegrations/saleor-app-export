import create from 'zustand'

import { ExportObjectTypesEnum } from '../../api/export/types'
import { ExportCommonStore, FileType } from '../../../globalTypes'

export const useExportCommonStore = create<ExportCommonStore>(set => ({
  fileType: FileType.CSV,
  name: '',
  reportId: null,
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
  setReportId: reportId => set({ reportId }),
  setFilter: filter =>
    set(() => {
      if (!filter) return { filter: null }
      return { filter: { filterStr: filter } }
    }),
  reset: currentUser =>
    set({
      fileType: FileType.CSV,
      name: '',
      reportId: null,
      filter: null,
      recipients: {
        addMore: false,
        users: [currentUser.id],
        permissionGroups: [],
      },
    }),
}))

export default useExportCommonStore
