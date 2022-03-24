import React, { useState } from 'react'
import { Dialog } from '@material-ui/core'
import produce from 'immer'

import {
  OrderFieldsKey,
  FieldEditPlatform,
  FieldEdit,
  SearchInput,
  useOrder,
} from '../../../common'
import { OptionsCheck, Option } from '../../../common/components/OptionsCheck'
import { OrderFieldEnum } from '../../../common/api/export'
import { useOrderFieldOptions } from '../../hooks'

interface OrderFieldEditProps {
  title: string
  fieldKey: OrderFieldsKey
  dialogTitle: string
  dialogSubtitle: string
}

export function OrderFieldEdit(props: OrderFieldEditProps) {
  const { fieldKey, title, dialogTitle, dialogSubtitle } = props
  const orderStore = useOrder()
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [options, setOptions] = useOrderFieldOptions(fieldKey)

  const onSubmit = () => {
    orderStore.setSpecificFields(
      fieldKey,
      options
        .filter(field => field.checked)
        .map(field => field.value) as OrderFieldEnum[]
    )
    setIsOpen(false)
  }

  const onCheck = (option: Option) => {
    setOptions(
      produce(draft => {
        const index = draft.findIndex(attr => attr.value === option.value)
        draft[index].checked = !option.checked
      })
    )
  }

  return (
    <>
      <FieldEdit
        setIsOpen={setIsOpen}
        title={title}
        description={
          orderStore.getSpecificFields(fieldKey).length
            ? `selected ${orderStore.getSpecificFields(fieldKey).length}`
            : undefined
        }
      />
      <Dialog onClose={() => setIsOpen(false)} open={isOpen}>
        <FieldEditPlatform
          search={
            <SearchInput
              onChange={event => setQuery(event.target.value)}
              value={query}
            />
          }
          title={dialogTitle}
          subtitle={dialogSubtitle}
          onSubmit={onSubmit}
          onExit={() => setIsOpen(false)}
        >
          <OptionsCheck options={options} onCheck={onCheck} />
        </FieldEditPlatform>
      </Dialog>
    </>
  )
}

export default OrderFieldEdit
