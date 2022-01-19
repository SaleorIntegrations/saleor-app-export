import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { OrderSetting, ReportPage } from '../../../components'
import {
  useMutationRunReport,
  useMutationUpdateOrderReport,
} from '../../../api/export/mutation'
import { useQueryReport } from '../../../api/export/query'
import { OrderSelectedColumnsInfo } from '../../../api/export/types'
import {
  useExportCommonStore,
  useExportOrderColumnsStore,
} from '../../../hooks'

export function UpdateOrderReport() {
  const { id } = useParams()
  const columnsStore = useExportOrderColumnsStore()
  const commonStore = useExportCommonStore()
  const [report] = useQueryReport({ reportId: parseInt(id || '') })
  const [, updateOrderReport] = useMutationUpdateOrderReport()
  const [, runReport] = useMutationRunReport()
  const [isLoading, setIsLoading] = useState(true)

  const onExport = () => {
    if (commonStore.id) runReport({ reportId: commonStore.id })
  }

  const onSaveAndExport = () => {
    updateOrderReport({
      fields: columnsStore.columns.orderFields,
      reportId: commonStore.id || -1,
      name: commonStore.name,
    })
  }

  useEffect(() => {
    if (report.data && !report.fetching) {
      const { type, id, name, filter, columns } = report.data.report
      commonStore.setType(type)
      commonStore.setId(id)
      commonStore.setName(name)
      commonStore.setFilter(filter)
      columnsStore.setColumns(columns as OrderSelectedColumnsInfo)
      setIsLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [report])

  useEffect(() => {
    setIsLoading(!(report.data && !report.fetching))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [report.fetching])

  if (isLoading) return <div>Loading...</div>

  return (
    <ReportPage
      reportType={commonStore.type}
      fileType={commonStore.fileType}
      setFileType={fileType => commonStore.setFileType(fileType)}
      onExport={onExport}
      onSaveAndExport={onSaveAndExport}
    >
      <OrderSetting />
    </ReportPage>
  )
}

export default UpdateOrderReport
