import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { OrderSetting, ReportPage } from '../../../components'
import {
  useExportCommonStore,
  useExportOrderColumnsStore,
} from '../../../hooks'
import {
  useMutationCreateOrdersReport,
  useMutationRunReport,
} from '../../../api/export/mutation'
import { ExportObjectTypesEnum } from '../../../api/export/types'

export function CreateOrderReport() {
  const navigation = useNavigate()
  const commonStore = useExportCommonStore()
  const columnsStore = useExportOrderColumnsStore()
  const [, createOrderReport] = useMutationCreateOrdersReport()
  const [, runReport] = useMutationRunReport()

  const onExport = async () => {
    const id = await createOrderExportReport()

    if (id) runReport({ reportId: id })
  }

  const onSaveAndExport = async () => {
    const id = await createOrderExportReport()

    if (id) {
      runReport({ reportId: id })
      navigation(`/report/${id}/order`)
    }
  }

  const createOrderExportReport = async () => {
    const response = await createOrderReport({
      fields: columnsStore.columns.orderFields,
      name: commonStore.name,
    })

    const report = response.data?.createOrdersReport

    if (report && report.errors.length < 1) {
      commonStore.setId(report.report?.id || null)
    }

    return report?.report?.id
  }

  const onTypeChange = () => {
    navigation('/create/product', { replace: true })
  }

  useEffect(() => {
    commonStore.setType(ExportObjectTypesEnum.ORDERS)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <ReportPage
      isMutable
      reportType={commonStore.type}
      setReportType={onTypeChange}
      fileType={commonStore.fileType}
      setFileType={fileType => commonStore.setFileType(fileType)}
      onExport={onExport}
      onSaveAndExport={onSaveAndExport}
    >
      <OrderSetting />
    </ReportPage>
  )
}

export default CreateOrderReport
