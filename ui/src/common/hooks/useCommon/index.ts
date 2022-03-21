import create from 'zustand'

import { FileType } from '../../../globalTypes'
import { RecipientInfo } from '../../api/export/types'

type Name = {
  value: string
  isValid: boolean
}
export interface CommonData {
  name: Name
  reportId: number | null
}

export interface CommonStore extends CommonData {
  setName: (name: Partial<Name>) => void
  setReportId: (reportId: number | null) => void
  reset: (data?: CommonData) => void
  valid: () => boolean
}

export const useCommon = create<CommonStore>((set, get) => ({
  name: {
    value: '',
    isValid: true,
  },
  reportId: null,
  setName: name =>
    set(state => ({
      name: {
        ...state.name,
        ...name,
      },
    })),
  setReportId: reportId => set({ reportId }),
  reset: data =>
    set({
      name: {
        value: '',
        isValid: true,
      },
      reportId: null,
      ...data,
    }),
  valid: () => {
    let isValid = true

    const name = get().name
    if (name.value === '') {
      isValid = false
      set({
        name: {
          ...name,
          isValid: false,
        },
      })
    }

    return isValid
  },
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
