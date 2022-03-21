import React from 'react'
import { Box, Grid } from '@material-ui/core'

import { ExportObjectTypesEnum } from '../../api/export/types'
import { FileType } from '../../../globalTypes'
// import ExportPicker from '../../../setting/general/components/ExportPicker'
// import ScheduleAndSharing from '../../../setting/common/components/ScheduleAndSharing'
import ReportType from '../../../setting/general/components/ReportType'
import SubmitBar from '../SubmitBar'

import useStyles from './styles'

interface ReportPageProps {
  reportType: ExportObjectTypesEnum
  fileType: FileType
  setFileType: (fileType: FileType) => void
  setReportType?: (
    _event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => void
  isMutable?: boolean
  children: React.ReactNode
  onExport?: () => void
  onSaveAndExport?: () => void
  onCancel?: () => void
  onSave?: () => void
}

export function ReportPage(props: ReportPageProps) {
  const classes = useStyles()
  const {
    reportType,
    // setFileType,
    // fileType,
    setReportType,
    isMutable,
    children,
    onExport,
    onSaveAndExport,
    onCancel,
    onSave,
  } = props

  return (
    <Box>
      <Box className={classes.content}>
        <Grid
          container
          direction="row-reverse"
          justifyContent="space-between"
          alignItems="flex-start"
          spacing={4}
        >
          <Grid item md={4}>
            <Box className={classes.list}>
              <ReportType
                reportType={reportType}
                onReportTypeChange={setReportType}
                isMutable={isMutable}
              />
              {/* <ExportPicker fileType={fileType} setFileType={setFileType} /> */}
              {/* <ScheduleAndSharing /> */}
            </Box>
          </Grid>
          <Grid item md={8}>
            {children}
          </Grid>
        </Grid>
      </Box>
      <SubmitBar
        onExport={onExport}
        onSaveAndExport={onSaveAndExport}
        onSave={onSave}
        onCancel={onCancel}
      />
    </Box>
  )
}

export default ReportPage
