import React, { useState } from 'react'

import {
  OrderFieldsKey,
  FieldEditPlatform,
  FieldEdit,
  SearchInput,
  useOrder,
  CheckAll,
  BlurDialog,
} from '../../../common'
import { OptionsCheck } from '../../../common/components/OptionsCheck'
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
      <BlurDialog onClose={() => setIsOpen(false)} open={isOpen}>
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
          {!query && (
            <CheckAll
              title="Select all variants"
              description="Make all variants available on all currently created options."
              isChecked={options.every(option => option.checked)}
              setOptions={setOptions}
              options={options}
            />
          )}
          <OptionsCheck
            options={options.filter(option =>
              option.name.toLowerCase().includes(query.toLowerCase())
            )}
            setOptions={setOptions}
          />
        </FieldEditPlatform>
      </BlurDialog>
    </>
  )
}

export default OrderFieldEdit
