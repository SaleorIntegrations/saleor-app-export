import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useToast } from 'saleor-app-ui'

import { useQueryReport } from '../../../common/api/export/query'
import {
  OrderSelectedColumnsInfo,
  ExportObjectTypesEnum,
} from '../../../common/api/export/types'
import { FileType } from '../../../globalTypes'
import ReportPage from '../../../common/components/ReportPage'
import OrderSetting from '../../components/OrderSetting'
import {
  useCurrentUser,
  useOrder,
  useExportCommonStore,
  isRecipientsSelected,
} from '../../../common'
import { useMutationRunReport } from '../../../common/api/export'
import { useMutationUpdateOrderReport } from '../../api'

export function UpdateOrderReport() {
  const { id } = useParams()
  const runToast = useToast()
  const navigate = useNavigate()
  const userId = useCurrentUser(state => state.user.id)
  const columnsStore = useOrder()
  const commonStore = useExportCommonStore()
  const [report] = useQueryReport({ reportId: parseInt(id || '') })
  const [, updateOrderReport] = useMutationUpdateOrderReport()
  const [, runReport] = useMutationRunReport()

  const onSaveAndExport = async () => {
    try {
      if (!commonStore.reportId) throw new Error('reportId is not set')

      // update report
      const updateResponse = await updateOrderReport({
        fields: columnsStore.columns.orderFields,
        reportId: commonStore.reportId,
        name: commonStore.name,
        recipients: {
          users: [userId],
          permissionGroups: [],
        },
      })
      const reportId = updateResponse.data?.updateOrdersReport.report?.id

      if (!reportId) throw new Error('create report error')

      // run report
      const runResponse = await runReport({ reportId })

      if (runResponse.error) throw new Error('runReport error')

      commonStore.setReportId(reportId)
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
      columnsStore.setColumns(columns as OrderSelectedColumnsInfo)
    }
  }, [])

  if (report.fetching) return <div>Loading...</div>
  return (
    <ReportPage
      reportType={ExportObjectTypesEnum.ORDERS}
      fileType={commonStore.fileType}
      setFileType={fileType => commonStore.setFileType(fileType)}
      onCancel={() => navigate('/')}
      onSaveAndExport={onSaveAndExport}
    >
      <OrderSetting />
    </ReportPage>
  )
}

export default UpdateOrderReport
