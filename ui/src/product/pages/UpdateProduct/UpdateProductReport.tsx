import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useToast } from 'saleor-app-ui'

import { useMutationRunReport } from '../../../common/api/export'
import { useMutationUpdateProductReport } from '../../api'
import { useQueryReport } from '../../../common/api/export/query'
import {
  ExportObjectTypesEnum,
  ProductSelectedColumnsInfo,
} from '../../../common/api/export/types'
import { FileType } from '../../../globalTypes'
import ReportPage from '../../../common/components/ReportPage'
import ProductSetting from '../../components/ProductSetting'
import { useCurrentUser, useCommon, useProduct } from '../../../common'

export function UpdateProductReport() {
  const { id } = useParams()
  const runToast = useToast()
  const navigate = useNavigate()
  const userId = useCurrentUser(state => state.user.id)
  const common = useCommon()
  const productStore = useProduct()
  const [report] = useQueryReport({ reportId: parseInt(id || '') })
  const [, updateProductReport] = useMutationUpdateProductReport()
  const [, runReport] = useMutationRunReport()

  const onSaveAndExport = async () => {
    try {
      const { productFields, ...columns } = productStore.columns
      if (!common.reportId) throw new Error('reportId is not set')

      // update report
      const updateResponse = await updateProductReport({
        columns: {
          ...columns,
          fields: productFields,
        },
        reportId: common.reportId,
        name: common.name,
        recipients: {
          users: [userId],
          permissionGroups: [],
        },
      })
      const reportId = updateResponse.data?.updateProductsReport.report?.id

      if (!reportId) throw new Error('create report error')

      // run report
      const runResponse = await runReport({ reportId })
      common.setReportId(reportId)

      if (runResponse.error) throw new Error('runReport error')

      runToast('Everything went well')
    } catch (error) {
      runToast('Someting went wrong', 'error')
    }
  }

  useEffect(() => {
    if (report.data && !report.fetching) {
      const { id, name, columns } = report.data.report
      // from api app has __typename
      const cleanColumns = columns as any
      delete cleanColumns['__typename']

      common.reset({
        reportId: id,
        name: name,
      })
      productStore.reset({
        columns: cleanColumns as ProductSelectedColumnsInfo,
      })
    }
  }, [report.fetching])

  if (report.fetching) return <div>Loading...</div>
  return (
    <ReportPage
      reportType={ExportObjectTypesEnum.PRODUCTS}
      fileType={FileType.CSV}
      setFileType={() => {}}
      onCancel={() => navigate('/')}
      onSaveAndExport={onSaveAndExport}
    >
      <ProductSetting />
    </ReportPage>
  )
}

export default UpdateProductReport
