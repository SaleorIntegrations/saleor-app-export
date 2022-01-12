import React, { useReducer, useEffect } from 'react'
import { Box } from '@material-ui/core'

import { GeneralInformation } from '../GeneralInformation'
import { ProductArea } from '../ProductArea'
import { useProductCountQuery } from '../../api'
import useStyles from './styles'
import { initialProductExport, productExportReducer } from './reducer'
import { ProductExport, ProductField } from '../../globalTypes'

interface ProductSettingProps {
  setProductSetting: (newProductSetting: ProductExport) => void
  initialExport?: ProductExport
}

const organisationsOptions = [
  ProductField.CATEGORY,
  ProductField.COLLECTIONS,
  ProductField.PRODUCT_TYPE,
]
const financialsOptions = [ProductField.CHARGE_TAXES]
const seoOptions = [
  ProductField.DESCRIPTION,
  ProductField.NAME,
  ProductField.PRODUCT_MEDIA,
  ProductField.VARIANT_MEDIA,
]
const inventoryOptions = [
  ProductField.PRODUCT_WEIGHT,
  ProductField.VARIANT_ID,
  ProductField.VARIANT_SKU,
  ProductField.VARIANT_WEIGHT,
]

export function ProductSetting(props: ProductSettingProps) {
  const { setProductSetting, initialExport } = props
  const classes = useStyles()
  // const [productCount] = useProductCountQuery()
  const [state, dispatch] = useReducer(
    productExportReducer,
    initialExport || initialProductExport
  )

  useEffect(() => {
    setProductSetting(state)
  }, [state])

  return (
    <Box className={classes.list}>
      <GeneralInformation
        value={state.name}
        onChange={e => dispatch({ type: 'SET_NAME', name: e.target.value })}
      />
      {/* <ProductArea
        isInformation
        productCount={productCount.data?.products.totalCount}
        title="Information"
        subtitle="Select information you want to export from options below."
        setProoductData={newExportInfo =>
          dispatch({
            type: 'SET_FILTER',
            filter: JSON.stringify(newExportInfo),
          })
        }
      /> */}
      <ProductArea
        title="Columns"
        subtitle="Define columns you want to export in your file"
        setProoductData={newExportInfo =>
          dispatch({
            type: 'SET_EXPORT_INFO',
            exportInfo: newExportInfo,
          })
        }
        initial={{
          channels: state.exportInfo.channels,
          organisations: state.exportInfo.fields.filter(field =>
            organisationsOptions.includes(field)
          ),
          attributes: state.exportInfo.attributes,
          financials: state.exportInfo.fields.filter(field =>
            financialsOptions.includes(field)
          ),
          seo: state.exportInfo.fields.filter(field =>
            seoOptions.includes(field)
          ),
          inventory: state.exportInfo.fields.filter(field =>
            inventoryOptions.includes(field)
          ),
          warehouses: state.exportInfo.warehouses,
        }}
      />
    </Box>
  )
}

export default ProductSetting
