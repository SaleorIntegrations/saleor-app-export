import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  useMutationCreateOrdersReport,
  useMutationRunReport,
} from '../../../api/export/mutation'
import {
  useExportCommonStore,
  useExportOrderColumnsStore,
  useCurrentUserStore,
} from '../../../common'
import ReportPage from '../../../common/components/ReportPage'
import OrderSetting from '../../../order/components/OrderSetting'

export function CreateOrderReport() {
  const navigate = useNavigate()
  const commonStore = useExportCommonStore()
  const columnsStore = useExportOrderColumnsStore()
  const currentUser = useCurrentUserStore(state => state.user)
  const [, createOrderReport] = useMutationCreateOrdersReport()
  const [, runReport] = useMutationRunReport()
  const [isLoading, setIsLoading] = useState(true)

  const onSave = async () => {
    const id = await createOrderExportReport()

    if (id) {
      runReport({ reportId: id })
      navigate(`/report/${id}/order`)
    }
  }

  const createOrderExportReport = async () => {
    const { addMore, users, permissionGroups } = commonStore.recipients
    const response = await createOrderReport({
      fields: columnsStore.columns.orderFields,
      name: commonStore.name,
      recipients: {
        users: addMore ? users : [currentUser.id],
        permissionGroups: addMore ? permissionGroups : [],
      },
    })

    const report = response.data?.createOrdersReport

    if (report && report.errors.length < 1) {
      commonStore.setId(report.report?.id || null)
    }

    return report?.report?.id
  }

  const onTypeChange = () => {
    navigate('/create/product', { replace: true })
  }

  useEffect(() => {
    commonStore.reset(currentUser)
    columnsStore.reset()
    setIsLoading(false)
  }, [])

  if (isLoading) return <div>Loading...</div>

  return (
    <ReportPage
      isMutable
      reportType={columnsStore.type}
      setReportType={onTypeChange}
      fileType={commonStore.fileType}
      setFileType={fileType => commonStore.setFileType(fileType)}
      onSave={onSave}
      onCancel={() => navigate('/')}
    >
      <OrderSetting />
    </ReportPage>
  )
}

export default CreateOrderReport
