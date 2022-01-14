import React, { useEffect, useReducer } from 'react'
import { Box, Container, Grid } from '@material-ui/core'
import { useParams } from 'react-router-dom'

import {
  SubmitBar,
  RaportType,
  ExportPicker,
  ProductSetting,
} from '../../../components'
import { ExportProductContext } from '../../../context'
import {
  useQueryReport,
  useMutationUpdateProductReport,
  useMutationRunReport,
} from '../../../api'
import { ExportObjectTypesEnum as ExportType } from '../../../globalTypes'
import { sortProductFields, sortOrderFields } from '../../../utils'
import { initialExport, exportReducer } from '../reducer'
import useStyles from '../styles'

export function Raport() {
  const classes = useStyles()
  const { id } = useParams()
  const [report] = useQueryReport({ reportId: parseInt(id || '') })
  const [updatedProductReport, updateProductReport] =
    useMutationUpdateProductReport()
  const [, runReport] = useMutationRunReport()
  const [state, dispatch] = useReducer(exportReducer, initialExport)

  const onExport = () => {
    runReport(
      {
        reportId: parseInt(id || ''),
      },
      {
        url: 'http://localhost:4321/graphql',
      }
    )
  }

  const onSaveAndExport = () => {
    if (state.exportType === ExportType.PRODUCTS) {
      updateProductExportRaport()
    }

    // TODO: save if order is set
  }

  const updateProductExportRaport = async () => {
    if (state.exportProductData) {
      const exportProduct = state.exportProductData
      updateProductReport(
        {
          reportId: state.id || -1,
          input: {
            columns: {
              attributes: exportProduct.exportInfo.attributes,
              fields: [
                ...exportProduct.exportInfo.fields.financials,
                ...exportProduct.exportInfo.fields.inventory,
                ...exportProduct.exportInfo.fields.organisations,
                ...exportProduct.exportInfo.fields.seo,
              ],
              channels: exportProduct.exportInfo.channels,
              warehouses: exportProduct.exportInfo.warehouses,
            },
            name: state.name,
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
    // TODO: update order export
  }

  useEffect(() => {
    if (report.data && !report.fetching) {
      const fetchedReport = report.data.report

      dispatch({ type: 'SET_EXPORT_TYPE', exportType: fetchedReport.type })
      dispatch({ type: 'SET_NAME', name: fetchedReport.name })
      dispatch({ type: 'SET_ID', id: fetchedReport.id })

      if (fetchedReport.type === ExportType.PRODUCTS) {
        dispatch({
          type: 'SET_EXPORT_PRODUCT_DATA',
          exportProductData: {
            filter: fetchedReport.filter,
            exportInfo: {
              attributes: fetchedReport.columns.attributes,
              channels: fetchedReport.columns.channels,
              fields: sortProductFields(fetchedReport.columns.productFields),
              warehouses: fetchedReport.columns.warehouses,
            },
          },
        })
      }

      if (fetchedReport.type === ExportType.ORDERS) {
        dispatch({
          type: 'SET_EXPORT_ORDER_DATA',
          exportOrderData: {
            filter: fetchedReport.filter,
            exportInfo: {
              fields: sortOrderFields(fetchedReport.columns.orderFields),
            },
          },
        })
      }
    }
  }, [report])

  useEffect(() => {
    if (updatedProductReport.data && !updatedProductReport.fetching) {
      const fetchedReport =
        updatedProductReport.data.updateProductsReport.report

      dispatch({ type: 'SET_NAME', name: fetchedReport.name })
      dispatch({ type: 'SET_ID', id: fetchedReport.id })

      if (fetchedReport.type === ExportType.PRODUCTS) {
        dispatch({
          type: 'SET_EXPORT_PRODUCT_DATA',
          exportProductData: {
            filter: fetchedReport.filter,
            exportInfo: {
              attributes: fetchedReport.columns.attributes,
              channels: fetchedReport.columns.channels,
              fields: sortProductFields(fetchedReport.columns.fields),
              warehouses: fetchedReport.columns.warehouses,
            },
          },
        })
      }
    }
  }, [updatedProductReport])

  if (report.fetching || updatedProductReport.fetching)
    return <div>Loading...</div>

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
              <div>{JSON.stringify(state)}</div>
            )}
          </Grid>
        </Grid>
      </Box>
      <SubmitBar onExport={onExport} onSaveAndExport={onSaveAndExport} />
    </Container>
  )
}

export default Raport
