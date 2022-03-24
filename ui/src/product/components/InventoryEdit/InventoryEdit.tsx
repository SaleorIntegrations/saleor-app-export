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

export function InventoryEdit() {
  const productStore = useProduct()
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [fetchedWarehouses, fetchWarehouses] = useQueryWarehouseList(
    {},
    { pause: true }
  )
  const [warehouses, setWarehouses] = useState<Option[]>([])

  const onSubmit = () => {
    productStore.setWarehouses(
      warehouses
        .filter(warehouse => warehouse.checked)
        .map(option => option.value)
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
