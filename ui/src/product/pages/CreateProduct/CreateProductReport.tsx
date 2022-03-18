import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useToast } from 'saleor-app-ui'

import {
  useCommon,
  useExportProductColumnsStore,
  useCurrentUser,
} from '../../../common'
import { useMutationRunReport } from '../../../common/api/export'
import ReportPage from '../../../common/components/ReportPage'
import { FileType } from '../../../globalTypes'
import { useMutationCreateProductsReport } from '../../api'
import ProductSetting from '../../components/ProductSetting'

export function CreateProductReport() {
  const navigate = useNavigate()
  const runToast = useToast()
  const common = useCommon()
  const columnsStore = useExportProductColumnsStore()
  const currentUser = useCurrentUser(state => state.user)
  const [, createProductReport] = useMutationCreateProductsReport()
  const [, runReport] = useMutationRunReport()

  // TODO: add report flag if comeone wants just export report
  const createReport = async (callback?: (reportId: number) => void) => {
    const { productFields, ...columns } = columnsStore.columns
    try {
      // create report
      const createResponse = await createProductReport({
        columns: {
          ...columns,
          fields: productFields,
        },
        name: common.name,
        recipients: {
          users: [currentUser.id],
          permissionGroups: [],
        },
      })
      const reportId = createResponse.data?.createProductsReport.report?.id

      if (!reportId) throw new Error('create report error')

      // run report
      const runResponse = await runReport({ reportId })
      common.setReportId(reportId)

      if (runResponse.error) throw new Error('runReport error')

      callback && callback(reportId)
      runToast('Everything went well')
    } catch (error) {
      runToast('Someting went wrong', 'error')
    }
  }

  const onSaveAndExport = () =>
    createReport(reportId => navigate(`/report/${reportId}/product`))

  const onExport = () => createReport()

  return (
    <ReportPage
      isMutable
      reportType={columnsStore.type}
      setReportType={() => navigate('/create/order', { replace: true })}
      fileType={FileType.CSV}
      setFileType={() => {}}
      onExport={onExport}
      onSaveAndExport={onSaveAndExport}
      onCancel={() => navigate('/')}
    >
      <ProductSetting />
    </ReportPage>
  )
}

export default CreateProductReport
