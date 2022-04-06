import { useEffect, useState } from 'react'

import { useProduct, ProductFieldsKey } from '../../../common'
import { Option } from '../../../common/components/OptionsCheck'
import { enrichedProductFields } from '../../utils'

export const useProductFieldOptions = (
  key: ProductFieldsKey
): [Option[], React.Dispatch<React.SetStateAction<Option[]>>] => {
  const productStore = useProduct()
  const [options, setOptions] = useState<Option[]>([])

  useEffect(() => {
    setOptions(
      enrichedProductFields[key].map(field => ({
        ...field,
        checked: productStore.getSpecificFields(key).includes(field.value),
      }))
    )
  }, [productStore.columns.productFields])

  return [options, setOptions]
}

export default useProductFieldOptions
