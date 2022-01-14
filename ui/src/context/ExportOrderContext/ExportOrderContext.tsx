import React from 'react'

import { OrderExport } from '../../globalTypes'

export interface ExportOrderContextType {
  id: number | null
  exportData: OrderExport
  name: string
  setExportData: (newExportData: OrderExport) => void
  setName: (newName: string) => void
}

export const ExportOrderContext = React.createContext<ExportOrderContextType>({
  name: '',
  id: null,
  exportData: {
    filter: '',
    exportInfo: {
      fields: {
        basic: [],
        financial: [],
        customer: [],
        items: [],
        payments: [],
        fulfillments: [],
      },
    },
  },
  setName: () => {},
  setExportData: () => {},
})

export default ExportOrderContext
