import create from 'zustand'
import { produce } from 'immer'

import { ExportProductColumnsStore } from '../globalTypes'

export const useExportProductColumnsStore = create<ExportProductColumnsStore>(
  set => ({
    columns: {
      attributes: [],
      channels: [],
      warehouses: [],
      productFields: [],
    },
    setColumns: columns => set({ columns: columns }),
    setAttributes: attributes =>
      set(state =>
        produce(state, draft => {
          draft.columns.attributes = attributes
        })
      ),
    setChannels: channels =>
      set(state =>
        produce(state, draft => {
          draft.columns.channels = channels
        })
      ),
    setWarehouses: warehouses =>
      set(state =>
        produce(state, draft => {
          draft.columns.warehouses = warehouses
        })
      ),
    setProductFields: productFields =>
      set(state =>
        produce(state, draft => {
          draft.columns.productFields = productFields
        })
      ),
    clear: () =>
      set(state => ({
        columns: {
          attributes: [],
          channels: [],
          warehouses: [],
          productFields: [],
        },
      })),
  })
)

export default useExportProductColumnsStore
