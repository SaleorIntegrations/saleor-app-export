import React, { useEffect, useState } from 'react'

import ModalSetting, { ModalOption } from '../ModalSetting'
import SearchInput from '../../SearchInput'
import { useQueryWarehouseList } from '../../../../api/saleor/query'
import CheckboxList from '../../CheckboxList'
import { Box } from '@material-ui/core'

interface InventorySettingModalProps {
  fields: string[]
  setFields: (newFields: string[]) => void
  warehouses: string[]
  setWarehouses: (newWarehouses: string[]) => void
  fieldOptions: ModalOption[]
  setIsOpen: (newIsOpen: boolean) => void
}

export function InventorySettingModal(props: InventorySettingModalProps) {
  const { setFields, setIsOpen, fieldOptions, warehouses, setWarehouses } =
    props
  const [fetchedWarehouses] = useQueryWarehouseList({})
  const [options, setOptions] = useState(fieldOptions)
  const [query, setQuery] = useState('')
  const [selfWarehouses, setSelfWarehouses] = useState<ModalOption[]>([])

  const onExit = () => {
    setIsOpen(false)
  }

  const onSubmit = () => {
    setFields(
      options.filter(option => option.checked).map(option => option.value)
    )
    setWarehouses(selfWarehouses.filter(wh => wh.checked).map(wh => wh.value))
    setIsOpen(false)
  }

  const onSearch = (
    _event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setQuery(_event.target.value)
  }

  const search = <SearchInput onChange={onSearch} value={query} />

  const additionalSelect = (
    <Box marginTop={5}>
      <CheckboxList
        mainCheckboxTitle="Select all warehouses"
        options={selfWarehouses}
        setOptions={setSelfWarehouses}
      />
    </Box>
  )

  useEffect(() => {
    if (fetchedWarehouses.data) {
      const newWarehouses = fetchedWarehouses.data.warehouses.edges
      setSelfWarehouses(
        newWarehouses.map(({ node }) => ({
          id: node.id,
          slug: node.slug,
          value: node.id,
          checked: warehouses.includes(node.id),
          name: node.name,
        }))
      )
    }
  }, [fetchedWarehouses.data])

  return (
    <ModalSetting
      search={search}
      title="Select Inventory"
      subtitle="Select the inventory informations you want to export information for"
      checkboxTitle="Select all fields"
      checkboxSubtitle="Make all variants available on all currently created options."
      options={options}
      filter={option => option.name.toLowerCase().includes(query.toLowerCase())}
      additionalSelect={additionalSelect}
      setOptions={setOptions}
      onExit={onExit}
      onSubmit={onSubmit}
    />
  )
}

export default InventorySettingModal
