import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useToast } from 'saleor-app-ui'

import { useMutationRunReport } from '../../../common/api/export'
import { useMutationUpdateProductReport } from '../../api'
import { useQueryReport } from '../../../common/api/export/query'
import { ProductSelectedColumnsInfo } from '../../../common/api/export/types'
import { FileType } from '../../../globalTypes'
import ReportPage from '../../../common/components/ReportPage'
import ProductSetting from '../../components/ProductSetting'
import {
  isRecipientsSelected,
  useCurrentUser,
  useExportCommonStore,
  useExportProductColumnsStore,
} from '../../../common'

export function UpdateProductReport() {
  const { id } = useParams()
  const runToast = useToast()
  const navigate = useNavigate()
  const userId = useCurrentUser(state => state.user.id)
  const commonStore = useExportCommonStore()
  const columnsStore = useExportProductColumnsStore()
  const [report] = useQueryReport({ reportId: parseInt(id || '') })
  const [, updateProductReport] = useMutationUpdateProductReport()
  const [, runReport] = useMutationRunReport()

  const onSaveAndExport = async () => {
    try {
      const { productFields, ...columns } = columnsStore.columns
      if (!commonStore.reportId) throw new Error('reportId is not set')

      // update report
      const updateResponse = await updateProductReport({
        columns: {
          ...columns,
          fields: productFields,
        },
        reportId: commonStore.reportId,
        name: commonStore.name,
        recipients: {
          users: [userId],
          permissionGroups: [],
        },
      })
      const reportId = updateResponse.data?.updateProductsReport.report?.id

      if (!reportId) throw new Error('create report error')

      // run report
      const runResponse = await runReport({ reportId })
      commonStore.setReportId(reportId)

      if (runResponse.error) throw new Error('runReport error')

      runToast('Everything went well')
    } catch (error) {
      runToast('Someting went wrong', 'error')
    }
  }

  useEffect(() => {
    if (report.data && !report.fetching) {
      const { id, name, filter, columns, recipients } = report.data.report
      commonStore.initialize({
        reportId: id,
        name: name,
        filter: filter ? { filterStr: filter } : null,
        fileType: FileType.CSV,
        recipients: {
          ...recipients,
          addMore: isRecipientsSelected({ ...recipients }),
        },
      })
      columnsStore.setColumns(columns as ProductSelectedColumnsInfo)
    }
  }, [])

  if (report.fetching) return <div>Loading...</div>
  return (
    <ReportPage
      reportType={columnsStore.type}
      fileType={commonStore.fileType}
      setFileType={fileType => commonStore.setFileType(fileType)}
      onCancel={() => navigate('/')}
      onSaveAndExport={onSaveAndExport}
    >
      <ProductSetting />
    </ReportPage>
  )
}

export default UpdateProductReport
