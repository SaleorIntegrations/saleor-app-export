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
  useCommon,
  CommonData,
  OrderData,
} from '../../../common'
import { useMutationRunReport } from '../../../common/api/export'
import { useMutationUpdateOrderReport } from '../../api'

export function UpdateOrderReport() {
  const { id } = useParams()
  const runToast = useToast()
  const navigate = useNavigate()
  const userId = useCurrentUser(state => state.user.id)
  const orderStore = useOrder()
  const common = useCommon()
  const [report] = useQueryReport({ reportId: parseInt(id || '') })
  const [, updateOrderReport] = useMutationUpdateOrderReport()
  const [, runReport] = useMutationRunReport()

  const updateStore = (commonData: CommonData, orderData: OrderData) => {
    common.reset(commonData)
    orderStore.reset(orderData)
  }

  const onSaveAndExport = async () => {
    if (!common.valid()) return

    try {
      if (!common.reportId) throw new Error('reportId is not set')

      // update report
      const updateResponse = await updateOrderReport({
        fields: orderStore.columns.orderFields,
        reportId: common.reportId,
        name: common.name.value,
        recipients: {
          users: [userId],
          permissionGroups: [],
        },
      })
      const report = updateResponse.data?.updateOrdersReport.report
      if (!report) throw new Error('create report error')

      updateStore(
        { reportId: report.id, name: { value: report.name, isValid: true } },
        { columns: report.columns as OrderSelectedColumnsInfo }
      )

      // run report
      const runResponse = await runReport({ reportId: report.id })
      if (runResponse.error) throw new Error('runReport error')

      common.setReportId(report.id)
      runToast('Everything went well')
    } catch (error) {
      runToast('Someting went wrong', 'error')
    }
  }

  useEffect(() => {
    if (report.data && !report.fetching) {
      const { id, name, columns } = report.data.report
      updateStore(
        { reportId: id, name: { value: name, isValid: true } },
        { columns: columns as OrderSelectedColumnsInfo }
      )
    }

    return () => {
      common.reset()
      orderStore.reset()
    }
  }, [report.fetching])

  if (report.fetching) return <div>Loading...</div>
  return (
    <ReportPage
      reportType={ExportObjectTypesEnum.ORDERS}
      fileType={FileType.CSV}
      setFileType={() => {}}
      onCancel={() => navigate('/')}
      onSaveAndExport={onSaveAndExport}
    >
      <OrderSetting />
    </ReportPage>
  )
}

export default React.memo(UpdateOrderReport)
