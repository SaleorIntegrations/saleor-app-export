import React, { useReducer } from 'react'
import { Box, Container, Grid } from '@material-ui/core'
import { useNavigate } from 'react-router-dom'

import {
  SubmitBar,
  ReportType,
  ExportPicker,
  ProductSetting,
  OrderSetting,
} from '../../../components'
import {
  useMutationCreateProductsReport,
  useMutationCreateOrdersReport,
} from '../../../api/export/mutation'
import { ExportObjectTypesEnum } from '../../../api/export/types'
import { ExportContext } from '../../../context/ExportContext'
import { initialExport, exportReducer } from '../reducer'
import useStyles from '../styles'

export function CreateReport() {
  const classes = useStyles()
  const navigation = useNavigate()
  const [, createProductReport] = useMutationCreateProductsReport()
  const [, createOrderReport] = useMutationCreateOrdersReport()
  const [state, dispatch] = useReducer(exportReducer, initialExport)

  const onSaveAndExport = () => {
    if (state.type === ExportObjectTypesEnum.PRODUCTS) {
      createProductExportReport()
    }

    if (state.type === ExportObjectTypesEnum.ORDERS) {
      createOrderExportReport()
    }
  }

  const createProductExportReport = async () => {
    if ('productFields' in state.columns) {
      const response = await createProductReport(
        {
          columns: {
            attributes: state.columns.attributes,
            fields: state.columns.productFields,
            channels: state.columns.channels,
            warehouses: state.columns.warehouses,
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
        navigation(`/report/${response.data.createProductsReport.report?.id}`)
      }
    }
  }

  const createOrderExportReport = async () => {
    if ('orderFields' in state.columns) {
      const response = await createOrderReport(
        { fields: state.columns.orderFields, name: state.name },
        { url: 'http://localhost:4321/graphql' }
      )

      if (response.data && response.data.createOrdersReport.errors.length < 1) {
        navigation(`/report/${response.data.createOrdersReport.report?.id}`)
      }
    }
  }

  const onTypeChange = (
    _event: React.ChangeEvent<{
      name?: string | undefined
      value: unknown
    }>
  ) => {
    const type = _event.target.value as ExportObjectTypesEnum
    dispatch({
      action: 'SET_TYPE',
      type: type,
    })

    if (type === ExportObjectTypesEnum.PRODUCTS) {
      dispatch({
        action: 'SET_COLUMNS',
        columns: {
          productFields: [],
          attributes: [],
          channels: [],
          warehouses: [],
        },
      })
    } else {
      dispatch({
        action: 'SET_COLUMNS',
        columns: {
          orderFields: [],
        },
      })
    }
  }

  return (
    <ExportContext.Provider
      value={{ isLoading: false, state: state, dispatch: dispatch }}
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
                <ReportType
                  onReportTypeChange={onTypeChange}
                  isMutable={true}
                  reportType={state.type}
                />
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
        <SubmitBar
          onExport={() => alert('Export')}
          onSaveAndExport={onSaveAndExport}
        />
      </Container>
    </ExportContext.Provider>
  )
}

export default CreateReport
