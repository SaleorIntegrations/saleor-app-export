import React, { useEffect, useState } from 'react'
import { TextField } from '@material-ui/core'

import Layout from '../../components/Layout'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Content from '../../components/Content'
import ReportType from '../../components/ReportType'
import ExportPicker from '../../components/ExportPicker'
import ActionsContainer from '../../components/ActionsContainer'
import GeneralInformation from '../../components/GeneralInformation'
import ModalSelect from '../../components/ModalSelect'
import ChannelSettingModal from '../../components/ModalSetting/ChannelSettingModal'

const options = (
  <>
    <ReportType isMutable reportType="Products" />
    <ExportPicker />
    <ActionsContainer />
  </>
)

export function ExportSetting() {
  const [reportName, setReportName] = useState('')
  const [channels, setChannels] = useState<string[]>([])

  const content = (
    <>
      <GeneralInformation
        value={reportName}
        onChange={e => setReportName(e.target.value)}
      />
      <ModalSelect
        title="Channels"
        description="selected 2"
        render={setIsOpen => (
          <ChannelSettingModal
            channels={channels}
            setChannels={setChannels}
            setIsOpen={setIsOpen}
          />
        )}
      />
    </>
  )

  return (
    <Layout
      header={<Header />}
      content={<Content settings={content} options={options} />}
      footer={<Footer />}
    />
  )
}

export default ExportSetting
