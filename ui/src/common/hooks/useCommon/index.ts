import create from 'zustand'

import { FileType } from '../../../globalTypes'
import { RecipientInfo } from '../../api/export/types'
import { immer } from '../../../zustand'

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

const initState: CommonData = {
  name: {
    value: '',
    isValid: true,
  },
  reportId: null,
}

export const useCommon = create<CommonStore>(
  immer((set, get) => ({
    name: initState.name,
    reportId: initState.reportId,
    setName: name =>
      set(state => ({
        name: {
          ...state.name,
          ...name,
        },
      })),
    setReportId: reportId => set(state => void (state.reportId = reportId)),
    reset: data =>
      set(() => ({
        ...initState,
        ...data,
      })),
    valid: () => {
      let isValid = true

      const name = get().name
      if (name.value === '') {
        isValid = false
        set(state => void (state.name.isValid = isValid))
      }

      return isValid
    },
  }))
)

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
