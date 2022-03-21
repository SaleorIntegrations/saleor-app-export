import create from 'zustand'

import { FileType } from '../../../globalTypes'
import { RecipientInfo } from '../../api/export/types'

export interface CommonData {
  name: string
  reportId: number | null
}

export interface CommonStore extends CommonData {
  setName: (name: string) => void
  setReportId: (reportId: number | null) => void
  reset: (data?: CommonData) => void
}

export const useCommon = create<CommonStore>(set => ({
  name: '',
  reportId: null,
  setName: name => set({ name: name }),
  setReportId: reportId => set({ reportId }),
  reset: data =>
    set({
      name: '',
      reportId: null,
      ...data,
    }),
}))

export default useCommon

// ############## POSSIBLE FUTHER ##############
export interface Recipients extends RecipientInfo {
  addMore: boolean
}

export interface FutherCommon {
  fileType: FileType
  recipients: Recipients
}

export interface FutherCommonStore extends FutherCommon {
  setFileType: (fileType: FileType) => void
  setRecipients: (recipients: Recipients) => void
}

export const useFutherCommon = create<FutherCommonStore>(set => ({
  fileType: FileType.CSV,
  recipients: {
    addMore: false,
    users: [],
    permissionGroups: [],
  },
  setRecipients: recipients => set({ recipients }),
  setFileType: fileType => set({ fileType }),
}))
