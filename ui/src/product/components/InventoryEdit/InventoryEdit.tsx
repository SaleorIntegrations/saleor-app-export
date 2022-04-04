import React, { useEffect, useState } from 'react'
import { Skeleton } from '@material-ui/lab'
import { Box, Typography } from '@material-ui/core'
import produce from 'immer'

import {
  useProduct,
  FieldEditPlatform,
  FieldEdit,
  SearchInput,
  CheckAll,
  BlurDialog,
} from '../../../common'
import { useQueryWarehouseList } from '../../../common/api/saleor/query'
import { OptionsCheck, Option } from '../../../common/components/OptionsCheck'
import { ProductFieldEnum } from '../../../common/api/export'
import { useProductFieldOptions } from '../../hooks'

export function InventoryEdit() {
  const productStore = useProduct()
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [fetchedWarehouses, fetchWarehouses] = useQueryWarehouseList(
    {},
    { pause: true }
  )
  const [inventoryOptions, setInventoryOptions] =
    useProductFieldOptions('inventoryFields')
  const [warehouses, setWarehouses] = useState<Option[]>([])

  const onSubmit = () => {
    productStore.setWarehouses(
      warehouses
        .filter(warehouse => warehouse.checked)
        .map(option => option.value)
    )
    productStore.setSpecificFields(
      'inventoryFields',
      inventoryOptions
        .filter(field => field.checked)
        .map(field => field.value) as ProductFieldEnum[]
    )
    setIsOpen(false)
  }

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

  const onAllFieldCheck = (isChecked: boolean) => {
    setInventoryOptions(state =>
      state.map(option => ({ ...option, checked: !isChecked }))
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

  const allSelectedCount =
    productStore.columns.warehouses.length +
    productStore.getSpecificFields('inventoryFields').length
  return (
    <>
      <FieldEdit
        setIsOpen={setIsOpen}
        title="Inventory"
        description={
          allSelectedCount ? `selected ${allSelectedCount}` : undefined
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
          title="Select Inventory"
          subtitle="Select the inventory informations you want to export information for"
          onSubmit={onSubmit}
          onExit={() => setIsOpen(false)}
        >
          <Box marginBottom={2}>
            <Typography variant="h5" gutterBottom>
              Inventory
            </Typography>
            {!query && (
              <CheckAll
                title="Select all fields"
                description="Make all inventory variants available on all currently created options."
                isChecked={inventoryOptions.every(option => option.checked)}
                onCheck={onAllFieldCheck}
              />
            )}
            <OptionsCheck
              options={inventoryOptions.filter(field =>
                field.name.includes(query)
              )}
              onCheck={onFieldCheck}
            />
          </Box>
          <Box>
            <Typography variant="h5">Warehouses</Typography>
            <OptionsCheck
              options={warehouses.filter(warehouse =>
                warehouse.name.includes(query)
              )}
              onCheck={onWarehouseCheck}
            />
            {fetchedWarehouses.fetching && <Skeleton height={80} />}
          </Box>
        </FieldEditPlatform>
      </BlurDialog>
    </>
  )
}

export default InventoryEdit
