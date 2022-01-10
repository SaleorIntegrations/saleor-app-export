import React, { useReducer, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Box, Container, Grid } from '@material-ui/core'

import { SubmitBar, RaportType, ExportPicker } from '../../components'
import {
  useProductCountQuery,
  useMutationCreateProductsReport,
} from '../../api'
import { ExportObjectTypesEnum as ExportType } from '../../globalTypes'
import {
  initialExport,
  exportReducer,
  ProductExport,
  OrderExport,
} from './reducer'
import useStyles from './styles'
import ProductSetting from './Product'

export function Export() {
  const classes = useStyles()
  const [searchParams, setSearchParams] = useSearchParams()
  //const [raportType, setRaportType] = useState<ExportType>(ExportType.PRODUCTS)
  const [, createProductReport] = useMutationCreateProductsReport()
  const [state, dispatch] = useReducer(exportReducer, initialExport)

  const onSaveAndExport = () => {
    if (state.exportType === ExportType.PRODUCTS) {
      createProductExportRaport()
    }

    if (state.exportType === ExportType.ORDERS) {
      createOrderExportRaport()
    }
  }

  const createProductExportRaport = async () => {
    if (state.exportData) {
      const exportProduct = state.exportData as ProductExport
      const response = await createProductReport(
        {
          columns: exportProduct.exportInfo,
          name: exportProduct.name,
          filter: {
            filterStr: '{}' || exportProduct.filter, // TODO: remove empty object
          },
        },
        {
          url: 'http://localhost:4321/graphql',
        }
      )

      console.log(response)
    }
  }

  const createOrderExportRaport = async () => {
    if (state.exportData) {
      const exportOrder = state.exportData as OrderExport
      // TODO: add order create report implementation
    }
  }

  const onTypeChange = (
    _event: React.ChangeEvent<{
      name?: string | undefined
      value: unknown
    }>
  ) => {
    dispatch({
      type: 'SET_EXPORT_TYPE',
      exportType: _event.target.value as ExportType,
    })
    searchParams.set('type', _event.target.value as ExportType)
    setSearchParams(searchParams)
  }

  useEffect(() => {
    const type = searchParams.get('type')?.toUpperCase()
    const strict = searchParams.get('strict')

    if (type !== ExportType.ORDERS && type !== ExportType.PRODUCTS) {
      searchParams.set('type', ExportType.PRODUCTS)
    }
    if (strict !== 'true' && strict !== 'false') {
      searchParams.set('strict', 'false')
    }
    dispatch({
      type: 'SET_EXPORT_TYPE',
      exportType: searchParams.get('type') as ExportType,
    })
    setSearchParams(searchParams)
  }, [])

  return (
    <Container
      maxWidth="lg"
      style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
    >
      <Box style={{ flex: '1 1 auto', margin: '1em 0' }}>
        <Grid
          container
          direction="row-reverse"
          justifyContent="space-between"
          alignItems="flex-start"
          spacing={4}
        >
          <Grid item md={4}>
            <Box className={classes.list}>
              <RaportType
                onReportTypeChange={onTypeChange}
                isMutable={
                  !(searchParams.get('strict')?.toLocaleLowerCase() === 'true')
                }
                reportType={state.exportType}
              />
              <ExportPicker
                fileType={state.fileType}
                setFileType={newFileType =>
                  dispatch({ type: 'SET_FILE_TYPE', fileType: newFileType })
                }
              />
            </Box>
          </Grid>
          <Grid item md={8}>
            {state.exportType === ExportType.PRODUCTS ? (
              <ProductSetting
                setProductSetting={newProductExport =>
                  dispatch({
                    type: 'SET_EXPORT_DATA',
                    exportData: newProductExport,
                  })
                }
              />
            ) : (
              <div>orders</div>
            )}
          </Grid>
        </Grid>
      </Box>
      <SubmitBar
        onExport={() => alert('Export')}
        onSaveAndExport={onSaveAndExport}
      />
    </Container>
  )
}

export default Export
