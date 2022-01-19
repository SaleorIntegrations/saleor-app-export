import create from 'zustand'
import { produce } from 'immer'

import { ExportOrderColumnsStore } from '../globalTypes'

export const useExportOrderColumnsStore = create<ExportOrderColumnsStore>(
  set => ({
    columns: {
      orderFields: [],
    },
    setColumns: columns => set({ columns: columns }),
    setOrderFields: orderFields =>
      set(state =>
        produce(state, draft => {
          draft.columns.orderFields = orderFields
        })
      ),
    clear: () =>
      set(state => ({
        columns: {
          orderFields: [],
        },
      })),
  })
)

export default useExportOrderColumnsStore
