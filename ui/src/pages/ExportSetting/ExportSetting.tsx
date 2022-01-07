import React, { useReducer } from 'react'
import { Box, Container } from '@material-ui/core'

import {
  Footer,
  Content,
  ReportType,
  ExportPicker,
  GeneralInformation,
  ProductArea,
} from '../../components'
import { useProductCountQuery } from '../../api'
import { initialProductExport, productExportReducer } from './reducer'

export function ExportSetting() {
  const [productCount] = useProductCountQuery()
  const [state, dispatch] = useReducer(
    productExportReducer,
    initialProductExport
  )

  return (
    <Container
      maxWidth="lg"
      style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
    >
      <Box style={{ flex: '1 1 auto', margin: '1em 0' }}>
        <Content
          options={
            <>
              <ReportType reportType="Products" />
              <ExportPicker
                fileType={state.fileType}
                setFileType={newFileType =>
                  dispatch({ type: 'SET_FILE_TYPE', fileType: newFileType })
                }
              />
            </>
          }
          settings={
            <>
              <GeneralInformation
                value={state.name}
                onChange={e =>
                  dispatch({ type: 'SET_NAME', name: e.target.value })
                }
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
            </>
          }
        />
      </Box>
      <Footer />
    </Container>
  )
}

export default ExportSetting
