import React, { useState } from 'react'
import { Dialog } from '@material-ui/core'
import produce from 'immer'

import {
  ProductFieldsKey,
  useProduct,
  FieldEditPlatform,
  FieldEdit,
  SearchInput,
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

export default ProductFieldEdit
