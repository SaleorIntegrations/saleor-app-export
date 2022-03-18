import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useToast } from 'saleor-app-ui'

import {
  useExportCommonStore,
  useExportOrderColumnsStore,
  useCurrentUserStore,
} from '../../../common'
import { useMutationRunReport } from '../../../common/api/export'
import ReportPage from '../../../common/components/ReportPage'
import { useMutationCreateOrdersReport } from '../../api'
import OrderSetting from '../../components/OrderSetting'

export function CreateOrderReport() {
  const navigate = useNavigate()
  const runToast = useToast()
  const commonStore = useExportCommonStore()
  const columnsStore = useExportOrderColumnsStore()
  const currentUser = useCurrentUserStore(state => state.user)
  const [, createOrderReport] = useMutationCreateOrdersReport()
  const [, runReport] = useMutationRunReport()

  const onSaveAndExport = () =>
    createReport(reportId => navigate(`/report/${reportId}/order`))

  const onExport = () => createReport()

  const createReport = async (callback?: (reportId: number) => void) => {
    try {
      // create report
      const createResponse = await createOrderReport({
        fields: columnsStore.columns.orderFields,
        name: commonStore.name,
        recipients: {
          users: [currentUser.id],
          permissionGroups: [],
        },
      })
      const reportId = createResponse.data?.createOrdersReport.report?.id

      if (!reportId) throw new Error('create report error')

      // run report
      const runResponse = await runReport({ reportId })
      commonStore.setReportId(reportId)

      if (runResponse.error) throw new Error('runReport error')

      callback && callback(reportId)
      runToast('Everything went well')
    } catch (error) {
      runToast('Someting went wrong', 'error')
    }
  }

  return (
    <ReportPage
      isMutable
      reportType={columnsStore.type}
      setReportType={() => navigate('/create/product', { replace: true })}
      fileType={commonStore.fileType}
      setFileType={fileType => commonStore.setFileType(fileType)}
      onExport={onExport}
      onSaveAndExport={onSaveAndExport}
      onCancel={() => navigate('/')}
    >
      <OrderSetting />
    </ReportPage>
  )
}

export default CreateOrderReport
