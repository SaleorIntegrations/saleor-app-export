import React, { useEffect, useReducer, useState } from 'react'
import { Paper } from '@material-ui/core'

import { useMutationDeleteReport } from '../../../api/export/mutation'
import { useQueryReports } from '../../../api/export/query'

import { reportsReducer, initialReports } from './reducer'
import useStyles from './style'
import ReportTable from '../../components/ReportTable'
import TableHeader from '../../components/TableHeader'
import TableReportFilter from '../../components/TableReportFilter'

export function ReportList() {
  const classes = useStyles()
  const [state, dispatch] = useReducer(reportsReducer, initialReports)
  const [page, setPage] = useState(0)
  const [reportsPerPage, setReportsPerPage] = useState(10)
  const [pureReports, refetchPureReports] = useQueryReports(
    {
      first: 25,
      after: state.navigation.endCursor,
    },
    { pause: true, requestPolicy: 'network-only' }
  )
  const [, deleteReportMutation] = useMutationDeleteReport()

  const reset = () => {
    dispatch({ type: 'SET_TOTAL', total: 0 })
    dispatch({ type: 'SET_REPORTS', reports: [] })
    dispatch({
      type: 'SET_NAVIGATION',
      navigation: { endCursor: '', hasNext: true },
    })
  }

  const deleteSelectedReports = async () => {
    // TODO: implement delete reports
  }

  const deleteReport = async (id: number) => {
    const response = await deleteReportMutation({ reportId: id })

    if (response.data && response.data.deleteReport.errors.length === 0) {
      reset()
      refetchPureReports()
    }
  }

  useEffect(() => {
    if (pureReports.data && !pureReports.fetching) {
      const { edges, pageInfo, totalCount } = pureReports.data.reports

      dispatch({
        type: 'SET_REPORTS',
        reports: [
          ...state.reports,
          ...edges.map(({ node }) => ({
            isSelected: false,
            id: node.id,
            entity: node.type,
            recipients: node.recipients.users.length,
            groups: node.recipients.permissionGroups.length,
            name: node.name,
          })),
        ],
      })
      dispatch({
        type: 'SET_NAVIGATION',
        navigation: {
          hasNext: pageInfo.hasNext,
          endCursor: pageInfo.endCursor,
        },
      })
      dispatch({
        type: 'SET_TOTAL',
        total: totalCount,
      })
    }
  }, [pureReports])

  useEffect(() => {
    if (state.navigation.hasNext) refetchPureReports()
  }, [state.navigation.endCursor])

  return (
    <Paper className={classes.paper}>
      <TableHeader />
      <TableReportFilter />
      <ReportTable
        deleteSelectedReports={deleteSelectedReports}
        deleteReport={deleteReport}
        unselectAllReports={() => dispatch({ type: 'UNSELECT_ALL' })}
        selectAllReports={() => dispatch({ type: 'SELECT_ALL' })}
        toggleReport={id => dispatch({ type: 'TOGGLE_REPORT', id: id })}
        reports={state.reports}
        count={state.total}
        page={page}
        setPage={page => {
          setPage(page)
        }}
        rowsPerPage={reportsPerPage}
        setRowsPerPage={rowsPerPage => {
          reset()
          setPage(0)
          setReportsPerPage(rowsPerPage)
        }}
      />
    </Paper>
  )
}

export default ReportList
