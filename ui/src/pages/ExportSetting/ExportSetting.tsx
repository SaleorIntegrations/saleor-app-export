import React, { useReducer, useEffect } from 'react'
import { Box, Container } from '@material-ui/core'

import Footer from '../../components/Footer'
import Content from '../../components/Content'
import ReportType from '../../components/ReportType'
import ExportPicker from '../../components/ExportPicker'
import ActionsContainer from '../../components/ActionsContainer'
import GeneralInformation from '../../components/GeneralInformation'
import InformationArea from '../../components/InformationArea'
import { initialProductExport, productExportReducer } from './reducer'

export function ExportSetting() {
  const [state, dispatch] = useReducer(
    productExportReducer,
    initialProductExport
  )

  useEffect(() => {
    console.log(state)
  }, [state])

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
              <ExportPicker />
              <ActionsContainer />
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
              <InformationArea
                setInformations={newExportInfo =>
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
