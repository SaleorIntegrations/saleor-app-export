import React, { useState } from 'react'
import produce from 'immer'

import {
  ProductFieldsKey,
  useProduct,
  FieldEditPlatform,
  FieldEdit,
  SearchInput,
  CheckAll,
  BlurDialog,
} from '../../../common'
import { OptionsCheck, Option } from '../../../common/components/OptionsCheck'
import { ProductFieldEnum } from '../../../common/api/export'
import { useProductFieldOptions } from '../../hooks'

interface ProductFieldEditProps {
  title: string
  fieldKey: ProductFieldsKey
  dialogTitle: string
  dialogSubtitle: string
}

export function ProductFieldEdit(props: ProductFieldEditProps) {
  const { fieldKey, title, dialogTitle, dialogSubtitle } = props
  const productStore = useProduct()
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [options, setOptions] = useProductFieldOptions(fieldKey)

  const onSubmit = () => {
    productStore.setSpecificFields(
      fieldKey,
      options
        .filter(field => field.checked)
        .map(field => field.value) as ProductFieldEnum[]
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

  const onAllCheck = (isChecked: boolean) => {
    setOptions(state =>
      state.map(option => ({ ...option, checked: isChecked }))
    )
  }

  return (
    <>
      <FieldEdit
        setIsOpen={setIsOpen}
        title={title}
        description={
          productStore.getSpecificFields(fieldKey).length
            ? `selected ${productStore.getSpecificFields(fieldKey).length}`
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
              onCheck={onAllCheck}
            />
          )}
          <OptionsCheck
            options={options.filter(option =>
              option.name.toLowerCase().includes(query.toLowerCase())
            )}
            onCheck={onCheck}
          />
        </FieldEditPlatform>
      </BlurDialog>
    </>
  )
}

export default ProductFieldEdit
