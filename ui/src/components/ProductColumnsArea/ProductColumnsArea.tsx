/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { produce } from 'immer'
import { Typography, Box } from '@material-ui/core'
import clsx from 'clsx'

import { ModalSelect } from '../ModalSelect'
import { useProductExport } from '../../hooks'
import {
  ChannelSettingModal,
  AttributeSettingModal,
  BaseFieldSettingModal,
  InventorySettingModal,
} from '../ModalSetting'
import Surface from '../Surface'
import { ProductField } from '../../globalTypes'
import useStyles from './styles'

interface ProductAreaProps {
  title: string
  subtitle: string
}

export function ProductArea(props: ProductAreaProps) {
  const { title, subtitle } = props
  const { exportData, setExportData } = useProductExport()
  const classes = useStyles()

  return (
    <Surface padding={0}>
      <Box className={clsx(classes.paddingBox)}>
        <Box paddingBottom={2}>
          <Typography variant="h5">{title}</Typography>
          <Typography>{subtitle}</Typography>
        </Box>
        <Box className={classes.selectBox}>
          <ModalSelect
            title="Channels"
            description={
              exportData.exportInfo.channels.length
                ? `selected ${exportData.exportInfo.channels.length}`
                : undefined
            }
            render={setIsOpen => (
              <ChannelSettingModal
                channels={exportData.exportInfo.channels}
                setChannels={newChannels =>
                  setExportData(
                    produce(exportData, draft => {
                      draft.exportInfo.channels = newChannels
                    })
                  )
                }
                setIsOpen={setIsOpen}
              />
            )}
          />
          <ModalSelect
            title="Product organsation"
            description={
              exportData.exportInfo.fields.organisations.length
                ? `selected ${exportData.exportInfo.fields.organisations.length}`
                : undefined
            }
            render={setIsOpen => (
              <BaseFieldSettingModal
                fields={exportData.exportInfo.fields.organisations}
                setFields={newOrganisations =>
                  setExportData(
                    produce(exportData, draft => {
                      draft.exportInfo.fields.organisations =
                        newOrganisations as ProductField[]
                    })
                  )
                }
                setIsOpen={setIsOpen}
                title="Select Product Organization"
                subtitle="Select the product organizations you want to export information for"
                fieldOptions={[
                  {
                    id: 'CATEGORY_ID',
                    name: 'Category',
                    slug: 'category_slug',
                    checked:
                      exportData.exportInfo.fields.organisations.includes(
                        ProductField.CATEGORY
                      ),
                    value: ProductField.CATEGORY,
                  },
                  {
                    id: 'COLLECTIONS_ID',
                    name: 'Collections',
                    slug: 'Collections_slug',
                    checked:
                      exportData.exportInfo.fields.organisations.includes(
                        ProductField.COLLECTIONS
                      ),
                    value: ProductField.COLLECTIONS,
                  },
                  {
                    id: 'PRODUCT_TYPE_ID',
                    name: 'Type',
                    slug: 'Product_type_slug',
                    checked:
                      exportData.exportInfo.fields.organisations.includes(
                        ProductField.PRODUCT_TYPE
                      ),
                    value: ProductField.PRODUCT_TYPE,
                  },
                ]}
              />
            )}
          />
          <ModalSelect
            title="Attributes"
            description={
              exportData.exportInfo.attributes.length
                ? `selected ${exportData.exportInfo.attributes.length}`
                : undefined
            }
            render={setIsOpen => (
              <AttributeSettingModal
                attributes={exportData.exportInfo.attributes}
                setAttributes={newAttributes =>
                  setExportData(
                    produce(exportData, draft => {
                      draft.exportInfo.attributes = newAttributes
                    })
                  )
                }
                setIsOpen={setIsOpen}
              />
            )}
          />
          <ModalSelect
            title="Financial"
            description={
              exportData.exportInfo.fields.financials.length
                ? `selected ${exportData.exportInfo.fields.financials.length}`
                : undefined
            }
            render={setIsOpen => (
              <BaseFieldSettingModal
                fields={exportData.exportInfo.fields.financials}
                setFields={newFinancials =>
                  setExportData(
                    produce(exportData, draft => {
                      draft.exportInfo.fields.financials =
                        newFinancials as ProductField[]
                    })
                  )
                }
                setIsOpen={setIsOpen}
                title="Select Financial Informations"
                subtitle="Select the financial informations you want to export information for"
                fieldOptions={[
                  {
                    id: 'CHARGE_TAXES_ID',
                    name: 'Charge Taxes',
                    slug: 'charge_taxes_slug',
                    checked: exportData.exportInfo.fields.financials.includes(
                      ProductField.CHARGE_TAXES
                    ),
                    value: ProductField.CHARGE_TAXES,
                  },
                ]}
              />
            )}
          />
          <ModalSelect
            title="Inventory"
            description={
              exportData.exportInfo.fields.inventory.length ||
              exportData.exportInfo.warehouses.length
                ? `selected ${
                    exportData.exportInfo.fields.inventory.length +
                    exportData.exportInfo.warehouses.length
                  }`
                : undefined
            }
            render={setIsOpen => (
              <InventorySettingModal
                setIsOpen={setIsOpen}
                fields={exportData.exportInfo.fields.inventory}
                setFields={newInventory =>
                  setExportData(
                    produce(exportData, draft => {
                      draft.exportInfo.fields.inventory =
                        newInventory as ProductField[]
                    })
                  )
                }
                warehouses={exportData.exportInfo.warehouses}
                setWarehouses={newWarehouses =>
                  setExportData(
                    produce(exportData, draft => {
                      draft.exportInfo.warehouses =
                        newWarehouses as ProductField[]
                    })
                  )
                }
                fieldOptions={[
                  {
                    id: 'PRODUCT_WEIGHT_ID',
                    name: 'Export Product Weight',
                    slug: 'product_weight_slug',
                    checked: exportData.exportInfo.fields.inventory.includes(
                      ProductField.PRODUCT_WEIGHT
                    ),
                    value: ProductField.PRODUCT_WEIGHT,
                  },
                  {
                    id: 'VARIANT_ID_ID',
                    name: 'Export Variant ID',
                    slug: 'variant_id_slug',
                    checked: exportData.exportInfo.fields.inventory.includes(
                      ProductField.VARIANT_ID
                    ),
                    value: ProductField.VARIANT_ID,
                  },
                  {
                    id: 'VARIANT_SKU_ID',
                    name: 'Export Variant SKU',
                    slug: 'variant_sku_slug',
                    checked: exportData.exportInfo.fields.inventory.includes(
                      ProductField.VARIANT_SKU
                    ),
                    value: ProductField.VARIANT_SKU,
                  },
                  {
                    id: 'VARIANT_WEIGHT_ID',
                    name: 'Export Variant Weight',
                    slug: 'variant_weight_slug',
                    checked: exportData.exportInfo.fields.inventory.includes(
                      ProductField.VARIANT_WEIGHT
                    ),
                    value: ProductField.VARIANT_WEIGHT,
                  },
                ]}
              />
            )}
          />
          <ModalSelect
            title="SEO"
            description={
              exportData.exportInfo.fields.seo.length
                ? `selected ${exportData.exportInfo.fields.seo.length}`
                : undefined
            }
            render={setIsOpen => (
              <BaseFieldSettingModal
                fields={exportData.exportInfo.fields.seo}
                setFields={newSEO =>
                  setExportData(
                    produce(exportData, draft => {
                      draft.exportInfo.fields.seo = newSEO as ProductField[]
                    })
                  )
                }
                setIsOpen={setIsOpen}
                title="Select SEO Informations"
                subtitle="Select the SEO informations you want to export information for"
                fieldOptions={[
                  {
                    id: 'DESCRIPTION_ID',
                    name: 'Description',
                    slug: 'description_slug',
                    checked: exportData.exportInfo.fields.seo.includes(
                      ProductField.DESCRIPTION
                    ),
                    value: ProductField.DESCRIPTION,
                  },
                  {
                    id: 'NAME_ID',
                    name: 'Name',
                    slug: 'name_slug',
                    checked: exportData.exportInfo.fields.seo.includes(
                      ProductField.NAME
                    ),
                    value: ProductField.NAME,
                  },
                  {
                    id: 'PRODUCT_MEDIA_ID',
                    name: 'Product Images',
                    slug: 'product_media_slug',
                    checked: exportData.exportInfo.fields.seo.includes(
                      ProductField.PRODUCT_MEDIA
                    ),
                    value: ProductField.PRODUCT_MEDIA,
                  },
                  {
                    id: 'VARIANT_MEDIA_ID',
                    name: 'Variant Images',
                    slug: 'variant_images_slug',
                    checked: exportData.exportInfo.fields.seo.includes(
                      ProductField.VARIANT_MEDIA
                    ),
                    value: ProductField.VARIANT_MEDIA,
                  },
                ]}
              />
            )}
          />
        </Box>
      </Box>
    </Surface>
  )
}

export default ProductArea
