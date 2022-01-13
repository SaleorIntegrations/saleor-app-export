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
import { useQueryReport, useMutationUpdateProductReport } from '../../../api'
import { ExportObjectTypesEnum as ExportType } from '../../../globalTypes'
import { sortProductFields } from '../../../utils'
import { initialExport, exportReducer } from '../reducer'
import useStyles from '../styles'

export function Raport() {
  const classes = useStyles()
  const { id } = useParams()
  const [report] = useQueryReport({ reportId: id ? +id : 0 })
  const [updatedProductReport, updateProductReport] =
    useMutationUpdateProductReport()
  const [state, dispatch] = useReducer(exportReducer, initialExport)

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
          reportId: id ? +id : 0,
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
    // TODO: update order export
  }

  useEffect(() => {
    if (report.data && !report.fetching) {
      const fetchedReport = report.data.report

      dispatch({ type: 'SET_EXPORT_TYPE', exportType: fetchedReport.type })

      if (fetchedReport.type === ExportType.PRODUCTS) {
        dispatch({
          type: 'SET_EXPORT_PRODUCT_DATA',
          exportProductData: {
            name: fetchedReport.name,
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
    }
  }, [report])

  useEffect(() => {
    if (updatedProductReport.data && !updatedProductReport.fetching) {
      const fetchedReport =
        updatedProductReport.data.updateProductsReport.report

      if (fetchedReport.type === ExportType.PRODUCTS) {
        dispatch({
          type: 'SET_EXPORT_PRODUCT_DATA',
          exportProductData: {
            name: fetchedReport.name,
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
