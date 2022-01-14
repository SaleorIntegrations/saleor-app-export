import React from 'react'

import { ProductExport } from '../../globalTypes'

export interface ExportProductContextType {
  id: number | null
  exportData: ProductExport
  name: string
  setExportData: (newExportData: ProductExport) => void
  setName: (newName: string) => void
}

export const ExportProductContext =
  React.createContext<ExportProductContextType>({
    name: '',
    id: null,
    exportData: {
      filter: '',
      exportInfo: {
        attributes: [],
        channels: [],
        fields: {
          seo: [],
          inventory: [],
          organisations: [],
          financials: [],
        },
        warehouses: [],
      },
    },
    setName: () => {},
    setExportData: () => {},
  })

export default ExportProductContext
