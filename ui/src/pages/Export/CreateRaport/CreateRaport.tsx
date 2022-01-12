import React, { useReducer } from 'react'
import { Box, Container, Grid } from '@material-ui/core'
import { useNavigate } from 'react-router-dom'

import {
  SubmitBar,
  RaportType,
  ExportPicker,
  ProductSetting,
} from '../../../components'
import { useMutationCreateProductsReport } from '../../../api'
import {
  ExportObjectTypesEnum as ExportType,
  ProductExport,
  OrderExport,
} from '../../../globalTypes'
import { initialExport, exportReducer } from '../reducer'
import useStyles from '../styles'

export function CreateRaport() {
  const classes = useStyles()
  const navigation = useNavigate()
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

      if (
        response.data &&
        response.data.createProductsReport.errors.length < 1
      ) {
        navigation(`/raport/${response.data.createProductsReport.report.id}`)
      }
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

export default CreateRaport
