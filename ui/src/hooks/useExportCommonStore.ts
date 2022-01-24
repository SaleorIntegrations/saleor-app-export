import create from 'zustand'
import { produce } from 'immer'

import { ExportObjectTypesEnum } from '../api/export/types'
import { ExportCommonStore, FileType } from '../globalTypes'

export const useExportCommonStore = create<ExportCommonStore>(set => ({
  fileType: FileType.CSV,
  name: '',
  id: null,
  type: ExportObjectTypesEnum.PRODUCTS,
  filter: null,
  recipients: {
    users: [],
    permissionGroups: [],
  },
  initialize: data => set(state => data),
  setFileType: fileType => set(state => ({ fileType: fileType })),
  setName: name => set(state => ({ name: name })),
  setUsers: users =>
    set(state =>
      produce(state, draft => {
        draft.recipients.users = users
      })
    ),
  setPermissionGroups: permissionGroups =>
    set(state =>
      produce(state, draft => {
        draft.recipients.permissionGroups = permissionGroups
      })
    ),
  setId: id => set(state => ({ id: id })),
  setFilter: filter =>
    set(state => {
      if (!filter) return { filter: null }
      return { filter: { filterStr: filter } }
    }),
  reset: currentUser =>
    set(state => ({
      fileType: FileType.CSV,
      name: '',
      id: null,
      filter: null,
      recipients: {
        users: [currentUser.id],
        permissionGroups: [],
      },
    })),
}))

export default useExportCommonStore
