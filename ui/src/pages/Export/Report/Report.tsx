import React, { useEffect, useReducer, useState } from 'react'
import { Box, Container, Grid } from '@material-ui/core'
import { useParams } from 'react-router-dom'

import {
  SubmitBar,
  ReportType,
  ExportPicker,
  ProductSetting,
  OrderSetting,
} from '../../../components'
import { ExportContext } from '../../../context/ExportContext'
import {
  useMutationUpdateProductReport,
  useMutationRunReport,
  useMutationUpdateOrderReport,
} from '../../../api/export/mutation'
import { useQueryReport } from '../../../api/export/query'
import { ExportObjectTypesEnum } from '../../../api/export/types'
import { initialExport, exportReducer } from '../reducer'
import useStyles from '../styles'

export function Report() {
  const classes = useStyles()
  const { id } = useParams()
  const [report] = useQueryReport({ reportId: parseInt(id || '') })
  const [, updateProductReport] = useMutationUpdateProductReport()
  const [, updateOrderReport] = useMutationUpdateOrderReport()
  const [, runReport] = useMutationRunReport()
  const [state, dispatch] = useReducer(exportReducer, initialExport)
  const [isLoading, setIsLoading] = useState(true)

  const onExport = () => {
    if (state.id) runReport({ reportId: state.id })
  }

  const onSaveAndExport = () => {
    switch (state.type) {
      case ExportObjectTypesEnum.PRODUCTS:
        return updateProductExportReport()
      case ExportObjectTypesEnum.ORDERS:
        return updateOrderExportReport()
    }
  }

  const updateProductExportReport = async () => {
    if ('productFields' in state.columns) {
      await updateProductReport({
        reportId: state.id || -1,
        columns: {
          fields: state.columns.productFields,
          warehouses: state.columns.warehouses,
          channels: state.columns.channels,
          attributes: state.columns.attributes,
        },
        name: state.name,
        filter: state.filter ? state.filter : undefined,
      })
    }
  }

  const updateOrderExportReport = async () => {
    if ('orderFields' in state.columns) {
      await updateOrderReport({
        fields: state.columns.orderFields,
        reportId: state.id || -1,
        name: state.name,
      })
    }
  }

  useEffect(() => {
    if (report.data && !report.fetching) {
      const fetchedReport = report.data.report

      dispatch({ action: 'SET_TYPE', type: fetchedReport.type })
      dispatch({ action: 'SET_NAME', name: fetchedReport.name })
      dispatch({ action: 'SET_ID', id: fetchedReport.id })
      if (fetchedReport.filter) {
        dispatch({
          action: 'SET_FILTER',
          filter: { filterStr: fetchedReport.filter },
        })
      }

      if ('productFields' in fetchedReport.columns) {
        dispatch({
          action: 'SET_COLUMNS',
          columns: {
            attributes: fetchedReport.columns.attributes,
            channels: fetchedReport.columns.channels,
            warehouses: fetchedReport.columns.warehouses,
            productFields: fetchedReport.columns.productFields,
          },
        })
      }

      if ('orderFields' in fetchedReport.columns) {
        dispatch({
          action: 'SET_COLUMNS',
          columns: {
            orderFields: fetchedReport.columns.orderFields,
          },
        })
      }
    }
  }, [report])

  useEffect(() => {
    setIsLoading(report.fetching)
  }, [report.fetching])

  return (
    <ExportContext.Provider
      value={{ isLoading: isLoading, state: state, dispatch: dispatch }}
    >
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
                <ReportType reportType={state.type} />
                <ExportPicker
                  fileType={state.fileType}
                  setFileType={newFileType =>
                    dispatch({ action: 'SET_FILE_TYPE', fileType: newFileType })
                  }
                />
              </Box>
            </Grid>
            <Grid item md={8}>
              {state.type === ExportObjectTypesEnum.PRODUCTS ? (
                <ProductSetting />
              ) : (
                <OrderSetting />
              )}
            </Grid>
          </Grid>
        </Box>
        <SubmitBar onExport={onExport} onSaveAndExport={onSaveAndExport} />
      </Container>
    </ExportContext.Provider>
  )
}

export default Report
