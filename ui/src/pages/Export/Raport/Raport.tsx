import React, { useEffect, useReducer } from 'react'
import { Box, Container, Grid } from '@material-ui/core'
import { useParams } from 'react-router-dom'

import {
  SubmitBar,
  RaportType,
  ExportPicker,
  ProductSetting,
} from '../../../components'
import { useQueryReport, useMutationUpdateProductReport } from '../../../api'
import {
  ExportObjectTypesEnum as ExportType,
  ProductExport,
  // ProductExport,
  // OrderExport,
} from '../../../globalTypes'
import { initialExport, exportReducer } from '../reducer'
import useStyles from '../styles'

export function Raport() {
  const classes = useStyles()
  const { id } = useParams()
  const [report] = useQueryReport({ reportId: id ? +id : 0 })
  // const [, createProductReport] = useMutationCreateProductsReport()
  const [updatedProductReport, updateProductReport] =
    useMutationUpdateProductReport()
  const [state, dispatch] = useReducer(exportReducer, initialExport)

  const onSaveAndExport = () => {
    if (state.exportType === ExportType.PRODUCTS) {
      updateProductExportRaport()
    }
    // if (state.exportType === ExportType.ORDERS) {
    //   createOrderExportRaport()
    // }
  }

  const updateProductExportRaport = async () => {
    if (state.exportData) {
      const exportProduct = state.exportData as ProductExport
      updateProductReport(
        {
          reportId: id ? +id : 0,
          input: {
            columns: exportProduct.exportInfo,
            name: exportProduct.name,
            filter: {
              filterStr: '{}' || exportProduct.filter, // TODO: remove empty object
            },
          },
        },
        {
          url: 'http://localhost:4321/graphql',
        }
      )
    }
  }

  const updateOrderExportRaport = async () => {
    // if (state.exportData) {
    //   const exportOrder = state.exportData as OrderExport
    //   // TODO: add order create report implementation
    // }
  }

  // const onTypeChange = (
  //   _event: React.ChangeEvent<{
  //     name?: string | undefined
  //     value: unknown
  //   }>
  // ) => {
  //   dispatch({
  //     type: 'SET_EXPORT_TYPE',
  //     exportType: _event.target.value as ExportType,
  //   })
  // }

  useEffect(() => {
    if (report.data && !report.fetching) {
      const fetchedReport = report.data.report
      dispatch({
        type: 'SET_EXPORT_DATA',
        exportData: {
          name: fetchedReport.name,
          filter: fetchedReport.filter,
          exportInfo: {
            attributes: fetchedReport.columns.attributes,
            channels: fetchedReport.columns.channels,
            fields:
              fetchedReport.columns.productFields ||
              fetchedReport.columns.orderFields,
            warehouses: fetchedReport.columns.warehouses,
          },
        },
      })
      dispatch({ type: 'SET_EXPORT_TYPE', exportType: fetchedReport.type })
    }
  }, [report])

  useEffect(() => {
    if (updatedProductReport.data && !updatedProductReport.fetching) {
      const fetchedReport =
        updatedProductReport.data.updateProductsReport.report
      dispatch({
        type: 'SET_EXPORT_DATA',
        exportData: {
          name: fetchedReport.name,
          filter: fetchedReport.filter,
          exportInfo: {
            attributes: fetchedReport.columns.attributes,
            channels: fetchedReport.columns.channels,
            fields: fetchedReport.columns.fields,
            warehouses: fetchedReport.columns.warehouses,
          },
        },
      })
    }
  }, [updatedProductReport])

  if (report.fetching || !state.exportData || updatedProductReport.fetching)
    return <div>Loading...</div>

  console.log(state)

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
              <RaportType reportType={state.exportType} />
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
                initialExport={state.exportData as ProductExport}
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

export default Raport
