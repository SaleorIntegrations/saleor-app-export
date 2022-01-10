/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useReducer } from 'react'
import { Typography, Box } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import clsx from 'clsx'

import { ProductField, ExportInfo } from '../../globalTypes'
import { ModalSelect } from '../ModalSelect'
import {
  ChannelSettingModal,
  AttributeSettingModal,
  BaseFieldSettingModal,
  InventorySettingModal,
} from '../ModalSetting'
import Surface from '../Surface'
import Label from '../Label'
import { initialInformations, informationsReducer } from './reducer'
import useStyles from './styles'

interface ProductAreaProps {
  isInformation?: boolean
  productCount?: number
  title: string
  subtitle: string
  setProoductData: (newInformations: ExportInfo) => void
}

export function ProductArea(props: ProductAreaProps) {
  const { setProoductData, title, subtitle, isInformation, productCount } =
    props
  const classes = useStyles()
  const [state, dispatch] = useReducer(informationsReducer, initialInformations)

  useEffect(() => {
    setProoductData({
      channels: state.channels,
      attributes: state.attributes,
      fields: [
        ...state.financials,
        ...state.inventory,
        ...state.organisations,
        ...state.seo,
      ] as ProductField[],
      warehouses: state.warehouses,
    })
  }, [state])

  return (
    <Surface padding={0}>
      <Box
        className={clsx(classes.paddingBox, isInformation && classes.bottomHr)}
      >
        <Box paddingBottom={2}>
          <Typography variant="h5">{title}</Typography>
          <Typography>{subtitle}</Typography>
        </Box>
        <Box className={classes.selectBox}>
          <ModalSelect
            title="Channels"
            description={
              state.channels.length
                ? `selected ${state.channels.length}`
                : undefined
            }
            render={setIsOpen => (
              <ChannelSettingModal
                channels={state.channels}
                setChannels={newChannels =>
                  dispatch({ type: 'SET_CHANNELS', channels: newChannels })
                }
                setIsOpen={setIsOpen}
              />
            )}
          />
          <ModalSelect
            title="Product organsation"
            description={
              state.organisations.length
                ? `selected ${state.organisations.length}`
                : undefined
            }
            render={setIsOpen => (
              <BaseFieldSettingModal
                fields={state.organisations}
                setFields={newOrganisations =>
                  dispatch({
                    type: 'SET_ORGANISATIONS',
                    organisations: newOrganisations,
                  })
                }
                setIsOpen={setIsOpen}
                title="Select Product Organization"
                subtitle="Select the product organizations you want to export information for"
                fieldOptions={[
                  {
                    id: 'CATEGORY_ID',
                    name: 'Category',
                    slug: 'category_slug',
                    checked: state.organisations.includes(
                      ProductField.CATEGORY
                    ),
                    value: ProductField.CATEGORY,
                  },
                  {
                    id: 'COLLECTIONS_ID',
                    name: 'Collections',
                    slug: 'Collections_slug',
                    checked: state.organisations.includes(
                      ProductField.COLLECTIONS
                    ),
                    value: ProductField.COLLECTIONS,
                  },
                  {
                    id: 'PRODUCT_TYPE_ID',
                    name: 'Type',
                    slug: 'Product_type_slug',
                    checked: state.organisations.includes(
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
              state.attributes.length
                ? `selected ${state.attributes.length}`
                : undefined
            }
            render={setIsOpen => (
              <AttributeSettingModal
                attributes={state.attributes}
                setAttributes={newAttributes =>
                  dispatch({
                    type: 'SET_ATTRIBUTES',
                    attributes: newAttributes,
                  })
                }
                setIsOpen={setIsOpen}
              />
            )}
          />
          <ModalSelect
            title="Financial"
            description={
              state.financials.length
                ? `selected ${state.financials.length}`
                : undefined
            }
            render={setIsOpen => (
              <BaseFieldSettingModal
                fields={state.financials}
                setFields={newFinancials =>
                  dispatch({
                    type: 'SET_FINANCIALS',
                    financials: newFinancials,
                  })
                }
                setIsOpen={setIsOpen}
                title="Select Financial Informations"
                subtitle="Select the financial informations you want to export information for"
                fieldOptions={[
                  {
                    id: 'CHARGE_TAXES_ID',
                    name: 'Charge Taxes',
                    slug: 'charge_taxes_slug',
                    checked: state.financials.includes(
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
              state.inventory.length || state.warehouses.length
                ? `selected ${state.inventory.length + state.warehouses.length}`
                : undefined
            }
            render={setIsOpen => (
              <InventorySettingModal
                setIsOpen={setIsOpen}
                fields={state.inventory}
                setFields={newInventory =>
                  dispatch({ type: 'SET_INVENTORY', inventory: newInventory })
                }
                warehouses={state.warehouses}
                setWarehouses={newWarehouses =>
                  dispatch({
                    type: 'SET_WAREHOUSES',
                    warehouses: newWarehouses,
                  })
                }
                fieldOptions={[
                  {
                    id: 'PRODUCT_WEIGHT_ID',
                    name: 'Export Product Weight',
                    slug: 'product_weight_slug',
                    checked: state.inventory.includes(
                      ProductField.PRODUCT_WEIGHT
                    ),
                    value: ProductField.PRODUCT_WEIGHT,
                  },
                  {
                    id: 'VARIANT_ID_ID',
                    name: 'Export Variant ID',
                    slug: 'variant_id_slug',
                    checked: state.inventory.includes(ProductField.VARIANT_ID),
                    value: ProductField.VARIANT_ID,
                  },
                  {
                    id: 'VARIANT_SKU_ID',
                    name: 'Export Variant SKU',
                    slug: 'variant_sku_slug',
                    checked: state.inventory.includes(ProductField.VARIANT_SKU),
                    value: ProductField.VARIANT_SKU,
                  },
                  {
                    id: 'VARIANT_WEIGHT_ID',
                    name: 'Export Variant Weight',
                    slug: 'variant_weight_slug',
                    checked: state.inventory.includes(
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
              state.seo.length ? `selected ${state.seo.length}` : undefined
            }
            render={setIsOpen => (
              <BaseFieldSettingModal
                fields={state.seo}
                setFields={newSEO => dispatch({ type: 'SET_SEO', seo: newSEO })}
                setIsOpen={setIsOpen}
                title="Select SEO Informations"
                subtitle="Select the SEO informations you want to export information for"
                fieldOptions={[
                  {
                    id: 'DESCRIPTION_ID',
                    name: 'Description',
                    slug: 'description_slug',
                    checked: state.seo.includes(ProductField.DESCRIPTION),
                    value: ProductField.DESCRIPTION,
                  },
                  {
                    id: 'NAME_ID',
                    name: 'Name',
                    slug: 'name_slug',
                    checked: state.seo.includes(ProductField.NAME),
                    value: ProductField.NAME,
                  },
                  {
                    id: 'PRODUCT_MEDIA_ID',
                    name: 'Product Images',
                    slug: 'product_media_slug',
                    checked: state.seo.includes(ProductField.PRODUCT_MEDIA),
                    value: ProductField.PRODUCT_MEDIA,
                  },
                  {
                    id: 'VARIANT_MEDIA_ID',
                    name: 'Variant Images',
                    slug: 'variant_images_slug',
                    checked: state.seo.includes(ProductField.VARIANT_MEDIA),
                    value: ProductField.VARIANT_MEDIA,
                  },
                ]}
              />
            )}
          />
        </Box>
      </Box>
      {isInformation && (
        <Box className={classes.paddingBox}>
          <Label>EXPORTED DATA</Label>
          {!productCount ? (
            <Skeleton />
          ) : (
            <Typography>{`You will be exporting ${productCount} products`}</Typography>
          )}
        </Box>
      )}
    </Surface>
  )
}

export default ProductArea
