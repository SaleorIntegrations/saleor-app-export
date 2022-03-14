import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useToast } from 'saleor-app-ui'

import {
  useExportCommonStore,
  useExportProductColumnsStore,
  useCurrentUserStore,
} from '../../../common'
import { useMutationRunReport } from '../../../common/api/export'
import ReportPage from '../../../common/components/ReportPage'
import { useMutationCreateProductsReport } from '../../api'
import ProductSetting from '../../components/ProductSetting'

export function CreateProductReport() {
  const navigate = useNavigate()
  const runToast = useToast()
  const commonStore = useExportCommonStore()
  const columnsStore = useExportProductColumnsStore()
  const currentUser = useCurrentUserStore(state => state.user)
  const [, createProductReport] = useMutationCreateProductsReport()
  const [, runReport] = useMutationRunReport()
  const [isLoading, setIsLoading] = useState(true)

  const onSave = async () => {
    const id = await createProductExportReport()

    if (id) {
      runReport({ reportId: id })
      navigate(`/report/${id}/product`)
    } else {
      runToast('Someting went wrong', 'error')
    }
  }

  const createProductExportReport = async () => {
    const { addMore, users, permissionGroups } = commonStore.recipients
    const response = await createProductReport({
      columns: {
        attributes: columnsStore.columns.attributes,
        fields: columnsStore.columns.productFields,
        channels: columnsStore.columns.channels,
        warehouses: columnsStore.columns.warehouses,
      },
      name: commonStore.name,
      recipients: {
        users: addMore ? users : [currentUser.id],
        permissionGroups: addMore ? permissionGroups : [],
      },
    })

    const report = response.data?.createProductsReport

    if (report && report.errors.length < 1) {
      commonStore.setId(report.report?.id || null)
    }

    return report?.report?.id
  }

  const onTypeChange = () => {
    navigate('/create/order', { replace: true })
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
      <ProductSetting />
    </ReportPage>
  )
}

export default CreateProductReport
