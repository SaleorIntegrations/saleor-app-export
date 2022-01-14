import { useContext } from 'react'

import { ExportOrderContext } from '../context'

export const useOrderExport = () => {
  const orderExport = useContext(ExportOrderContext)

  if (!orderExport) {
    throw new Error('Export order provider is not set')
  }

  return orderExport
}

export default useOrderExport
