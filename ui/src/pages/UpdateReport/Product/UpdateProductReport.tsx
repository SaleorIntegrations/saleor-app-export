import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { ProductSetting, ReportPage } from '../../../components'
import {
  useMutationRunReport,
  useMutationUpdateProductReport,
} from '../../../api/export/mutation'
import { useQueryReport } from '../../../api/export/query'
import { ProductSelectedColumnsInfo } from '../../../api/export/types'
import {
  useExportCommonStore,
  useExportProductColumnsStore,
} from '../../../hooks'

export function UpdateProductReport() {
  const { id } = useParams()
  const commonStore = useExportCommonStore()
  const columnsStore = useExportProductColumnsStore()
  const [report] = useQueryReport({ reportId: parseInt(id || '') })
  const [, updateProductReport] = useMutationUpdateProductReport()
  const [, runReport] = useMutationRunReport()
  const [isLoading, setIsLoading] = useState(true)

  const onExport = () => {
    if (commonStore.id) runReport({ reportId: commonStore.id })
  }

  const onSaveAndExport = () => {
    updateProductReport({
      columns: {
        fields: columnsStore.columns.productFields,
        warehouses: columnsStore.columns.warehouses,
        channels: columnsStore.columns.channels,
        attributes: columnsStore.columns.attributes,
      },
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
      columnsStore.setColumns(columns as ProductSelectedColumnsInfo)
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
      <ProductSetting />
    </ReportPage>
  )
}

export default UpdateProductReport
