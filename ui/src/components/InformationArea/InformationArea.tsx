import React, { useEffect, useState } from 'react'
import { Typography, Box } from '@material-ui/core'
import clsx from 'clsx'

import { ModalSelect } from '../ModalSelect'
import {
  ChannelSettingModal,
  AttributeSettingModal,
  BaseFieldSettingModal,
} from '../ModalSetting'
import Surface from '../Surface'
import Label from '../Label'
import useStyles from './styles'

export function InformationArea() {
  const [channels, setChannels] = useState<string[]>([])
  const [fields, setFields] = useState<string[]>([])
  const [attributes, setAttributes] = useState<string[]>([])
  const [financials, setFinancials] = useState<string[]>([])
  const [seo, setSEO] = useState<string[]>([])
  const classes = useStyles()

  // TODO: remove after work done
  useEffect(() => {
    console.log({
      channels: channels,
      warehouses: [],
      attributes: attributes,
      fields: [...fields, ...financials, ...seo],
    })
  }, [channels, fields, attributes, financials, seo])

  return (
    <Surface padding={0}>
      <Box className={clsx(classes.paddingBox, classes.bottomHr)}>
        <Box paddingBottom={2}>
          <Typography variant="h5">Information</Typography>
          <Typography>
            Select information you want to export from options below.
          </Typography>
        </Box>
        <Box className={classes.selectBox}>
          <ModalSelect
            title="Channels"
            description={
              channels.length ? `selected ${channels.length}` : undefined
            }
            render={setIsOpen => (
              <ChannelSettingModal
                channels={channels}
                setChannels={setChannels}
                setIsOpen={setIsOpen}
              />
            )}
          />
          <ModalSelect
            title="Product organsation"
            description={
              fields.length ? `selected ${fields.length}` : undefined
            }
            render={setIsOpen => (
              <BaseFieldSettingModal
                fields={fields}
                setFields={setFields}
                setIsOpen={setIsOpen}
                title="Select Product Organization"
                subtitle="Select the product organizations you want to export information for"
                fieldOptions={[
                  {
                    id: 'CATEGORY_ID',
                    name: 'Category',
                    slug: 'category_slug',
                    checked: fields.includes('CATEGORY'),
                    value: 'CATEGORY',
                  },
                  {
                    id: 'COLLECTIONS_ID',
                    name: 'Collections',
                    slug: 'Collections_slug',
                    checked: fields.includes('COLLECTIONS'),
                    value: 'COLLECTIONS',
                  },
                  {
                    id: 'PRODUCT_TYPE_ID',
                    name: 'Type',
                    slug: 'Product_type_slug',
                    checked: fields.includes('PRODUCT_TYPE'),
                    value: 'PRODUCT_TYPE',
                  },
                ]}
              />
            )}
          />
          <ModalSelect
            title="Attributes"
            description={
              attributes.length ? `selected ${attributes.length}` : undefined
            }
            render={setIsOpen => (
              <AttributeSettingModal
                attributes={attributes}
                setAttributes={setAttributes}
                setIsOpen={setIsOpen}
              />
            )}
          />
          <ModalSelect
            title="Financial"
            description={
              financials.length ? `selected ${financials.length}` : undefined
            }
            render={setIsOpen => (
              <BaseFieldSettingModal
                fields={financials}
                setFields={setFinancials}
                setIsOpen={setIsOpen}
                title="Select Financial Informations"
                subtitle="Select the financial informations you want to export information for"
                fieldOptions={[
                  {
                    id: 'CHARGE_TAXES_ID',
                    name: 'Charge Taxes',
                    slug: 'charge_taxes_slug',
                    checked: fields.includes('CHARGE_TAXES'),
                    value: 'CHARGE_TAXES',
                  },
                ]}
              />
            )}
          />
          <ModalSelect
            title="SEO"
            description={seo.length ? `selected ${seo.length}` : undefined}
            render={setIsOpen => (
              <BaseFieldSettingModal
                fields={seo}
                setFields={setSEO}
                setIsOpen={setIsOpen}
                title="Select SEO Informations"
                subtitle="Select the SEO informations you want to export information for"
                fieldOptions={[
                  {
                    id: 'DESCRIPTION_ID',
                    name: 'Description',
                    slug: 'description_slug',
                    checked: fields.includes('DESCRIPTION'),
                    value: 'DESCRIPTION',
                  },
                  {
                    id: 'NAME_ID',
                    name: 'Name',
                    slug: 'name_slug',
                    checked: fields.includes('NAME'),
                    value: 'NAME',
                  },
                  {
                    id: 'PRODUCT_MEDIA_ID',
                    name: 'Product Images',
                    slug: 'product_media_slug',
                    checked: fields.includes('PRODUCT_MEDIA'),
                    value: 'PRODUCT_MEDIA',
                  },
                  {
                    id: 'VARIANT_MEDIA_ID',
                    name: 'Variant Images',
                    slug: 'variant_images_slug',
                    checked: fields.includes('VARIANT_MEDIA'),
                    value: 'VARIANT_MEDIA',
                  },
                ]}
              />
            )}
          />
        </Box>
      </Box>
      <Box className={classes.paddingBox}>
        <Label>EXPORTED DATA</Label>
        <Typography>You will be exporting 260 products</Typography>
      </Box>
    </Surface>
  )
}

export default InformationArea
