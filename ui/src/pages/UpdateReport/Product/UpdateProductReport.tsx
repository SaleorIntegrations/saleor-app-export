import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

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
import { FileType } from '../../../globalTypes'

export function UpdateProductReport() {
  const { id } = useParams()
  const navigate = useNavigate()
  const commonStore = useExportCommonStore()
  const columnsStore = useExportProductColumnsStore()
  const [report] = useQueryReport({ reportId: parseInt(id || '') })
  const [, updateProductReport] = useMutationUpdateProductReport()
  const [, runReport] = useMutationRunReport()
  const [isLoading, setIsLoading] = useState(true)

  const onExport = () => {
    if (commonStore.id) runReport({ reportId: commonStore.id })
  }

  const onSaveAndExport = async () => {
    await updateProductReport({
      columns: {
        fields: columnsStore.columns.productFields,
        warehouses: columnsStore.columns.warehouses,
        channels: columnsStore.columns.channels,
        attributes: columnsStore.columns.attributes,
      },
      reportId: commonStore.id || -1,
      name: commonStore.name,
      recipients: commonStore.recipients,
    })
    onExport()
  }

  useEffect(() => {
    if (report.data && !report.fetching) {
      const {
        id,
        name,
        filter,
        columns,
        recipients: { users, permissionGroups },
      } = report.data.report
      commonStore.initialize({
        id: id,
        name: name,
        filter: filter ? { filterStr: filter } : null,
        fileType: FileType.CSV,
        recipients: { users, permissionGroups },
      })
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
      reportType={columnsStore.type}
      fileType={commonStore.fileType}
      setFileType={fileType => commonStore.setFileType(fileType)}
      onExport={onExport}
      onCancel={() => navigate('/')}
      onSaveAndExport={onSaveAndExport}
    >
      <ProductSetting />
    </ReportPage>
  )
}

export default UpdateProductReport
