import React, { useEffect, useState } from 'react'
import { Skeleton } from '@material-ui/lab'
import { Dialog } from '@material-ui/core'
import produce from 'immer'

import {
  useProduct,
  FieldEditPlatform,
  FieldEdit,
  SearchInput,
} from '../../../common'
import { useQueryWarehouseList } from '../../../common/api/saleor/query'
import { OptionsCheck, Option } from '../../../common/components/OptionsCheck'
import { enrichedProductFields, inventoryFields } from '../../utils'
import { ProductFieldEnum } from '../../../common/api/export'

export function InventoryEdit() {
  const productStore = useProduct()
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [fetchedWarehouses, fetchWarehouses] = useQueryWarehouseList(
    {},
    { pause: true }
  )
  const [inventoryOptions, setInventoryOptions] = useState<Option[]>(
    enrichedProductFields['inventoryFields'].map(field => ({
      ...field,
      checked: productStore.columns.productFields.includes(field.value),
    }))
  )
  const [warehouses, setWarehouses] = useState<Option[]>([])

  const onSubmit = () => {
    productStore.setWarehouses(
      warehouses
        .filter(warehouse => warehouse.checked)
        .map(option => option.value)
    )
    productStore.setProductFields(
      produce(productStore.columns.productFields, draft => {
        const notInventoryFields = draft.filter(
          field => !inventoryFields.includes(field)
        )
        const setInventoryFields = inventoryOptions
          .filter(field => field.checked)
          .map(field => field.value)

        draft = [
          ...notInventoryFields,
          ...setInventoryFields,
        ] as ProductFieldEnum[]
      })
    )
    setIsOpen(false)
  }

  const search = (
    <SearchInput
      onChange={event => setQuery(event.target.value)}
      value={query}
    />
  )

  const onWarehouseCheck = (option: Option) => {
    setWarehouses(
      produce(draft => {
        const index = draft.findIndex(attr => attr.value === option.value)
        draft[index].checked = !option.checked
      })
    )
  }

  const onFieldCheck = (option: Option) => {
    setInventoryOptions(
      produce(draft => {
        const index = draft.findIndex(attr => attr.value === option.value)
        draft[index].checked = !option.checked
      })
    )
  }

  useEffect(() => {
    if (!fetchedWarehouses.data || fetchedWarehouses.fetching) return

    setWarehouses(
      fetchedWarehouses.data.warehouses.edges.map(({ node }) => ({
        name: node.name,
        checked: productStore.columns.warehouses.includes(node.id),
        value: node.id,
      }))
    )
  }, [fetchedWarehouses.data])

  useEffect(() => {
    fetchWarehouses()
  }, [])

  return (
    <>
      <FieldEdit
        setIsOpen={setIsOpen}
        title="Inventory"
        description={
          productStore.columns.warehouses.length
            ? `selected ${productStore.columns.warehouses.length}`
            : undefined
        }
      />
      <Dialog onClose={() => setIsOpen(false)} open={isOpen}>
        <FieldEditPlatform
          search={search}
          title="Select Inventory"
          subtitle="Select the inventory informations you want to export information for"
          onSubmit={onSubmit}
          onExit={() => setIsOpen(false)}
        >
          <OptionsCheck
            options={inventoryOptions.filter(field =>
              field.name.includes(query)
            )}
            onCheck={onFieldCheck}
          />
          <OptionsCheck
            options={warehouses.filter(warehouse =>
              warehouse.name.includes(query)
            )}
            onCheck={onWarehouseCheck}
          />
          {fetchedWarehouses.fetching && <Skeleton height={80} />}
        </FieldEditPlatform>
      </Dialog>
    </>
  )
}

export default InventoryEdit
