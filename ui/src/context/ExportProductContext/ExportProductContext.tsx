import React from 'react'

import { ProductExport } from '../../globalTypes'

export interface ExportProductContextType {
  exportData: ProductExport
  setExportData: (newExportData: ProductExport) => void
}

export const ExportProductContext =
  React.createContext<ExportProductContextType>({
    exportData: {
      name: '',
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
    setExportData: () => {},
  })

export default ExportProductContext
