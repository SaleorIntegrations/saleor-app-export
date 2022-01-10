import React, { useReducer, useEffect } from 'react'
import { Box } from '@material-ui/core'

import { GeneralInformation, ProductArea } from '../../../components'
import { useProductCountQuery } from '../../../api'
import useStyles from '../styles'
import { initialProductExport, productExportReducer } from './reducer'
import { ProductExport } from '../reducer'

interface ProductProps {
  setProductSetting: (newProductSetting: ProductExport) => void
}

export function Product(props: ProductProps) {
  const { setProductSetting } = props
  const classes = useStyles()
  const [productCount] = useProductCountQuery()
  const [state, dispatch] = useReducer(
    productExportReducer,
    initialProductExport
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
      <ProductArea
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
      />
      <ProductArea
        title="Columns"
        subtitle="Define columns you want to export in your file"
        setProoductData={newExportInfo =>
          dispatch({
            type: 'SET_EXPORT_INFO',
            exportInfo: newExportInfo,
          })
        }
      />
    </Box>
  )
}

export default Product
