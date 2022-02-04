import create from 'zustand'
import { produce } from 'immer'

import { ExportObjectTypesEnum } from '../api/export/types'
import { ExportOrderColumnsStore } from '../globalTypes'

export const useExportOrderColumnsStore = create<ExportOrderColumnsStore>(
  set => ({
    columns: {
      orderFields: [],
    },
    type: ExportObjectTypesEnum.ORDERS,
    setColumns: columns => set({ columns: columns }),
    setOrderFields: orderFields =>
      set(state =>
        produce(state, draft => {
          draft.columns.orderFields = orderFields
        })
      ),
    reset: () =>
      set({
        columns: {
          orderFields: [],
        },
      }),
  })
)

export default useExportOrderColumnsStore
