import React, { useReducer } from 'react'
import { Box, Container, Grid } from '@material-ui/core'
import { useNavigate } from 'react-router-dom'

import {
  SubmitBar,
  RaportType,
  ExportPicker,
  ProductSetting,
  OrderSetting,
} from '../../../components'
import {
  useMutationCreateProductsReport,
  useMutationCreateOrdersReport,
} from '../../../api'
import { ExportProductContext, ExportOrderContext } from '../../../context'
import { ExportObjectTypesEnum as ExportType } from '../../../globalTypes'
import { initialExport, exportReducer } from '../reducer'
import useStyles from '../styles'

export function CreateRaport() {
  const classes = useStyles()
  const navigation = useNavigate()
  const [, createProductReport] = useMutationCreateProductsReport()
  const [, createOrderReport] = useMutationCreateOrdersReport()
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
    if (state.exportProductData) {
      const fields = Object.entries(state.exportProductData.exportInfo.fields)
        .map(([, fieldValues]) => fieldValues)
        .flat()
      const response = await createProductReport(
        {
          columns: {
            attributes: state.exportProductData.exportInfo.attributes,
            fields: fields,
            channels: state.exportProductData.exportInfo.channels,
            warehouses: state.exportProductData.exportInfo.warehouses,
          },
          name: state.name,
        },
        {
          url: 'http://localhost:4321/graphql',
        }
      )

      if (
        response.data &&
        response.data.createProductsReport.errors.length < 1
      ) {
        navigation(`/raport/${response.data.createProductsReport.report.id}`)
      }
    }
  }

  const createOrderExportRaport = async () => {
    const fields = Object.entries(state.exportOrderData.exportInfo.fields)
      .map(([, fieldValues]) => fieldValues)
      .flat()
    const response = await createOrderReport(
      { fields: fields, name: state.name },
      { url: 'http://localhost:4321/graphql' }
    )

    if (response.data && response.data.createOrdersReport.errors.length < 1) {
      navigation(`/raport/${response.data.createOrdersReport.report?.id}`)
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
  }

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
                isMutable={true}
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
              <ExportProductContext.Provider
                value={{
                  id: state.id,
                  name: state.name,
                  setName: newName =>
                    dispatch({ type: 'SET_NAME', name: newName }),
                  exportData: state.exportProductData,
                  setExportData: newExportData =>
                    dispatch({
                      type: 'SET_EXPORT_PRODUCT_DATA',
                      exportProductData: newExportData,
                    }),
                }}
              >
                <ProductSetting />
              </ExportProductContext.Provider>
            ) : (
              <ExportOrderContext.Provider
                value={{
                  id: state.id,
                  name: state.name,
                  setName: newName =>
                    dispatch({ type: 'SET_NAME', name: newName }),
                  exportData: state.exportOrderData,
                  setExportData: newExportData =>
                    dispatch({
                      type: 'SET_EXPORT_ORDER_DATA',
                      exportOrderData: newExportData,
                    }),
                }}
              >
                <OrderSetting />
              </ExportOrderContext.Provider>
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

export default CreateRaport
