import React, { useEffect, useState } from 'react'
import { produce } from 'immer'
import { Typography, Box } from '@material-ui/core'
import clsx from 'clsx'

import { ModalSelect } from '../../../common/components/ModalSelect'
import { ProductFieldEnum } from '../../../common/api/export/types'
import {
  ChannelSettingModal,
  BaseFieldSettingModal,
  InventorySettingModal,
} from '../../../common/components/ModalSetting'
import Surface from '../../../common/components/Surface'
import { sortProductFields } from '../../utils/sortProductFields'
import { useProduct } from '../../../common'
import { AttributesEdit } from '../AttributesEdit'
import { ChannelsEdit } from '../ChannelsEdit'

import { getFields } from './fields'
import useStyles from './styles'

interface ProductColumnsAreaProps {
  title: string
  subtitle: string
}

export function ProductColumnsArea(props: ProductColumnsAreaProps) {
  const { title, subtitle } = props
  const { setChannels, setProductFields, setWarehouses, columns } = useProduct()
  const [fields, setFields] = useState(sortProductFields(columns.productFields))
  const classes = useStyles()

  useEffect(() => {
    setProductFields(Object.values(fields).flat())
  }, [fields])

  return (
    <Surface padding={0}>
      <Box className={clsx(classes.paddingBox)}>
        <Box paddingBottom={2}>
          <Typography variant="h5">{title}</Typography>
          <Typography>{subtitle}</Typography>
        </Box>
        <Box className={classes.selectBox}>
          <ChannelsEdit />
          {/* <ModalSelect
            title="Channels"
            description={
              columns.channels.length
                ? `selected ${columns.channels.length}`
                : undefined
            }
            render={setIsOpen => (
              <ChannelSettingModal
                channels={columns.channels}
                setChannels={setChannels}
                setIsOpen={setIsOpen}
              />
            )}
          /> */}
          <ModalSelect
            title="Product organsation"
            description={
              fields.organisations.length
                ? `selected ${fields.organisations.length}`
                : undefined
            }
            render={setIsOpen => (
              <BaseFieldSettingModal
                fields={fields.organisations}
                setFields={newOrganisations =>
                  setFields(
                    produce(draft => {
                      draft.organisations =
                        newOrganisations as ProductFieldEnum[]
                    })
                  )
                }
                setIsOpen={setIsOpen}
                title="Select Product Organization"
                subtitle="Select the product organizations you want to export information for"
                fieldOptions={getFields(fields.organisations, 'organisations')}
              />
            )}
          />
          <AttributesEdit />
          <ModalSelect
            title="Financial"
            description={
              fields.financials.length
                ? `selected ${fields.financials.length}`
                : undefined
            }
            render={setIsOpen => (
              <BaseFieldSettingModal
                fields={fields.financials}
                setFields={newFinancials =>
                  setFields(
                    produce(draft => {
                      draft.financials = newFinancials as ProductFieldEnum[]
                    })
                  )
                }
                setIsOpen={setIsOpen}
                title="Select Financial Informations"
                subtitle="Select the financial informations you want to export information for"
                fieldOptions={getFields(fields.financials, 'financials')}
              />
            )}
          />
          <ModalSelect
            title="Inventory"
            description={
              fields.inventory.length || columns.warehouses.length
                ? `selected ${
                    fields.inventory.length + columns.warehouses.length
                  }`
                : undefined
            }
            render={setIsOpen => (
              <InventorySettingModal
                setIsOpen={setIsOpen}
                fields={fields.inventory}
                setFields={newInventory =>
                  setFields(
                    produce(draft => {
                      draft.inventory = newInventory as ProductFieldEnum[]
                    })
                  )
                }
                warehouses={columns.warehouses}
                setWarehouses={setWarehouses}
                fieldOptions={getFields(fields.inventory, 'inventory')}
              />
            )}
          />
          <ModalSelect
            title="SEO"
            description={
              fields.seo.length ? `selected ${fields.seo.length}` : undefined
            }
            render={setIsOpen => (
              <BaseFieldSettingModal
                fields={fields.seo}
                setFields={newSEO =>
                  setFields(
                    produce(draft => {
                      draft.seo = newSEO as ProductFieldEnum[]
                    })
                  )
                }
                setIsOpen={setIsOpen}
                title="Select SEO Informations"
                subtitle="Select the SEO informations you want to export information for"
                fieldOptions={getFields(fields.seo, 'seo')}
              />
            )}
          />
        </Box>
      </Box>
    </Surface>
  )
}

export default ProductColumnsArea
