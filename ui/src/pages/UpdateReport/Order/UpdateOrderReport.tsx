import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import {
  useMutationRunReport,
  useMutationUpdateOrderReport,
} from '../../../api/export/mutation'
import { useQueryReport } from '../../../api/export/query'
import { OrderSelectedColumnsInfo } from '../../../api/export/types'
import { FileType } from '../../../globalTypes'
import ReportPage from '../../../common/components/ReportPage'
import OrderSetting from '../../../order/components/OrderSetting'
import {
  useCurrentUserStore,
  useExportOrderColumnsStore,
  useExportCommonStore,
  isRecipientsSelected,
} from '../../../common'

export function UpdateOrderReport() {
  const { id } = useParams()
  const navigate = useNavigate()
  const userId = useCurrentUserStore(state => state.user.id)
  const columnsStore = useExportOrderColumnsStore()
  const commonStore = useExportCommonStore()
  const [report] = useQueryReport({ reportId: parseInt(id || '') })
  const [, updateOrderReport] = useMutationUpdateOrderReport()
  const [, runReport] = useMutationRunReport()
  const [isLoading, setIsLoading] = useState(true)

  const onExport = () => {
    if (commonStore.id) runReport({ reportId: commonStore.id })
  }

  const onSaveAndExport = async () => {
    const { addMore, users, permissionGroups } = commonStore.recipients

    await updateOrderReport({
      fields: columnsStore.columns.orderFields,
      reportId: commonStore.id || -1,
      name: commonStore.name,
      recipients: {
        users: addMore ? users : [userId],
        permissionGroups: addMore ? permissionGroups : [],
      },
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
        recipients: {
          users,
          permissionGroups,
          addMore: isRecipientsSelected({ permissionGroups, users }),
        },
      })
      columnsStore.setColumns(columns as OrderSelectedColumnsInfo)
      setIsLoading(false)
    }
  }, [report])

  useEffect(() => {
    setIsLoading(!(report.data && !report.fetching))
  }, [report.fetching])

  if (isLoading) return <div>Loading...</div>

  return (
    <ReportPage
      reportType={columnsStore.type}
      fileType={commonStore.fileType}
      setFileType={fileType => commonStore.setFileType(fileType)}
      onCancel={() => navigate('/')}
      onExport={onExport}
      onSaveAndExport={onSaveAndExport}
    >
      <OrderSetting />
    </ReportPage>
  )
}

export default UpdateOrderReport
