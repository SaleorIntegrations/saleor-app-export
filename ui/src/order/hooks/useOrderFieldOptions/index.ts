import { useEffect, useState } from 'react'

import { useOrder, OrderFieldsKey } from '../../../common'
import { Option } from '../../../common/components/OptionsCheck'
import { enrichedOrderFields } from '../../utils'

export const useOrderFieldOptions = (
  key: OrderFieldsKey
): [Option[], React.Dispatch<React.SetStateAction<Option[]>>] => {
  const orderStore = useOrder()
  const [options, setOptions] = useState<Option[]>([])

  useEffect(() => {
    setOptions(
      enrichedOrderFields[key].map(field => ({
        ...field,
        checked: orderStore.getSpecificFields(key).includes(field.value),
      }))
    )
  }, [orderStore.columns.orderFields])

  return [options, setOptions]
}

export default useOrderFieldOptions
