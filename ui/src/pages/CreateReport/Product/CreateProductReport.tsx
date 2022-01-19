import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { ReportPage, ProductSetting } from '../../../components'
import {
  useMutationCreateProductsReport,
  useMutationRunReport,
} from '../../../api/export/mutation'
import { ExportObjectTypesEnum } from '../../../api/export/types'
import {
  useExportCommonStore,
  useExportProductColumnsStore,
} from '../../../hooks'

export function CreateProductReport() {
  const navigation = useNavigate()
  const commonStore = useExportCommonStore()
  const columnsStore = useExportProductColumnsStore()
  const [, createProductReport] = useMutationCreateProductsReport()
  const [, runReport] = useMutationRunReport()

  const onExport = async () => {
    await createProductExportReport()

    if (commonStore.id) runReport({ reportId: commonStore.id || -1 })
  }

  const onSaveAndExport = async () => {
    const id = await createProductExportReport()

    if (id) {
      runReport({ reportId: id })
      navigation(`/report/${id}/product`)
    }
  }

  const createProductExportReport = async () => {
    const response = await createProductReport({
      columns: {
        attributes: columnsStore.columns.attributes,
        fields: columnsStore.columns.productFields,
        channels: columnsStore.columns.channels,
        warehouses: columnsStore.columns.warehouses,
      },
      name: commonStore.name,
    })

    const report = response.data?.createProductsReport

    if (report && report.errors.length < 1) {
      commonStore.setId(report.report?.id || null)
    }

    return report?.report?.id
  }

  const onTypeChange = () => {
    navigation('/create/order', { replace: true })
  }

  useEffect(() => {
    commonStore.setType(ExportObjectTypesEnum.PRODUCTS)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <ReportPage
      isMutable
      reportType={commonStore.type}
      setReportType={onTypeChange}
      fileType={commonStore.fileType}
      setFileType={fileType => commonStore.setFileType(fileType)}
      onExport={onExport}
      onSaveAndExport={onSaveAndExport}
    >
      <ProductSetting />
    </ReportPage>
  )
}

export default CreateProductReport
