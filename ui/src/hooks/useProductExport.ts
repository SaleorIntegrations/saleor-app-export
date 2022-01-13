import { useContext } from 'react'

import { ExportProductContext } from '../context'

export const useProductExport = () => {
  const productExport = useContext(ExportProductContext)

  if (!productExport) {
    throw new Error('Export provider is not set')
  }

  return productExport
}

export default useProductExport
