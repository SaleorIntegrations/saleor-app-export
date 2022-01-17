import React from 'react'

import { ExportObjectTypesEnum } from '../../api/export/types'
import { ExportAction, Export } from '../../pages/Export/reducer'
import { FileType } from '../../globalTypes'

export interface ExportContextType {
  isLoading: boolean
  state: Export
  dispatch: (action: ExportAction) => void
}

export const ExportContext = React.createContext<ExportContextType>({
  isLoading: true,
  state: {
    fileType: FileType.CSV,
    name: '',
    id: null,
    type: ExportObjectTypesEnum.PRODUCTS,
    filter: null,
    columns: {
      productFields: [],
      attributes: [],
      channels: [],
      warehouses: [],
    },
  },
  dispatch: () => {},
})

export default ExportContext
