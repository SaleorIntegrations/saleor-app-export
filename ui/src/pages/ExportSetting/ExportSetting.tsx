import React, { useState } from 'react'

import Layout from '../../components/Layout'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Content from '../../components/Content'
import ReportType from '../../components/ReportType'
import ExportPicker from '../../components/ExportPicker'
import ActionsContainer from '../../components/ActionsContainer'
import GeneralInformation from '../../components/GeneralInformation'
import InformationArea from '../../components/InformationArea'

const options = (
  <>
    <ReportType isMutable reportType="Products" />
    <ExportPicker />
    <ActionsContainer />
  </>
)

export function ExportSetting() {
  const [reportName, setReportName] = useState('')

  const content = (
    <>
      <GeneralInformation
        value={reportName}
        onChange={e => setReportName(e.target.value)}
      />
      <InformationArea />
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
