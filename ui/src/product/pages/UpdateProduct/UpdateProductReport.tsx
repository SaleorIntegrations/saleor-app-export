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
import {
  useCurrentUser,
  useCommon,
  useProduct,
  CommonData,
  ProductData,
} from '../../../common'

export function UpdateProductReport() {
  const params = useParams()
  const runToast = useToast()
  const navigate = useNavigate()
  const userId = useCurrentUser(state => state.user.id)
  const common = useCommon()
  const productStore = useProduct()
  const [report] = useQueryReport({ reportId: parseInt(params.id || '') })
  const [, updateProductReport] = useMutationUpdateProductReport()
  const [, runReport] = useMutationRunReport()

  const updateStore = (commonData: CommonData, productData: ProductData) => {
    common.reset(commonData)
    productStore.reset(productData)
  }

  const onSaveAndExport = async () => {
    if (!common.valid()) return

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
        name: common.name.value,
        recipients: {
          users: [userId],
          permissionGroups: [],
        },
      })

      const report = updateResponse.data?.updateProductsReport.report
      if (!report) throw new Error('create report error')

      // update store
      const cleanColumns = report.columns as any
      delete cleanColumns['__typename']
      updateStore(
        { reportId: report.id, name: { value: report.name, isValid: true } },
        { columns: cleanColumns as ProductSelectedColumnsInfo }
      )

      // run report
      const runResponse = await runReport({ reportId: report.id })
      if (runResponse.error) throw new Error('runReport error')

      runToast('Everything went well')
    } catch (error) {
      runToast(error, 'error')
    }
  }

  useEffect(() => {
    if (report.data && !report.fetching) {
      const { id, name, columns } = report.data.report
      // clean up columns
      const cleanColumns = { ...columns } as any
      delete cleanColumns['__typename']

      updateStore(
        {
          reportId: id,
          name: { value: name, isValid: true },
        },
        {
          columns: cleanColumns as ProductSelectedColumnsInfo,
        }
      )
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
