import React, { useEffect, useReducer, useState } from 'react'
import { Paper } from '@material-ui/core'

import { useQueryReports, useMutationDeleteReport } from '../../api'
import ReportTable from '../../components/ReportTable'
import TableHeader from '../../components/TableHeader'
import { useCommon, useOrder, useProduct } from '../../../common'
// import TableReportFilter from '../../components/TableReportFilter'

import { reportsReducer, initialReports } from './reducer'
import useStyles from './style'
import produce from 'immer'

export function ReportList() {
  const commonStore = useCommon()
  const orderStore = useOrder()
  const productStore = useProduct()
  const classes = useStyles()
  const [state, dispatch] = useReducer(reportsReducer, initialReports)
  const [reportsPerPage, setReportsPerPage] = useState(10)
  const [pureReports, refetchPureReports] = useQueryReports(
    {
      first: reportsPerPage,
      after: state.navigation.endCursor,
    },
    { pause: true }
  )
  const [, deleteReportMutation] = useMutationDeleteReport()

  const reset = () => dispatch({ type: 'RESET' })

  const deleteReport = async (id: number) => {
    const response = await deleteReportMutation({ reportId: id })
    if (!response.error) {
      dispatch({ type: 'DELETE_REPORT', id })
      dispatch({ type: 'SET_TOTAL', total: state.total - 1 })
    }
  }

  useEffect(() => {
    if (!pureReports.data || pureReports.fetching) return

    const { edges, pageInfo, totalCount } = pureReports.data.reports
    dispatch({
      type: 'RESET',
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
      navigation: produce(state.navigation, draft => {
        draft.hasNext = pageInfo.hasNext
        draft.endCursor = pageInfo.endCursor
      }),
      total: totalCount,
    })
  }, [pureReports.data])

  useEffect(() => {
    refetchPureReports({ requestPolicy: 'network-only' })
  }, [state.navigation.endPage, reportsPerPage])

  useEffect(() => {
    if (
      state.reports.slice(
        state.navigation.page * reportsPerPage,
        state.navigation.page * reportsPerPage + reportsPerPage
      ).length === 0
    )
      refetchPureReports({ requestPolicy: 'network-only' })
  }, [state.total])

  useEffect(() => {
    // clear all stores
    commonStore.reset()
    orderStore.reset()
    productStore.reset()
  }, [])

  return (
    <Paper className={classes.paper}>
      <TableHeader />
      {/* <TableReportFilter /> */}
      <ReportTable
        // deleteSelectedReports={deleteSelectedReports}
        // toggleReport={id => dispatch({ type: 'TOGGLE_REPORT', id: id })}
        deleteReport={deleteReport}
        unselectAllReports={() => dispatch({ type: 'UNSELECT_ALL' })}
        selectAllReports={() => dispatch({ type: 'SELECT_ALL' })}
        reports={state.reports}
        count={state.total}
        page={state.navigation.page}
        setPage={page =>
          dispatch({
            type: 'SET_NAVIGATION',
            navigation: produce(state.navigation, draft => {
              draft.page = page
              if (draft.endPage < page) {
                draft.endPage = page
              }
            }),
          })
        }
        rowsPerPage={reportsPerPage}
        setRowsPerPage={rowsPerPage => {
          reset()
          setReportsPerPage(rowsPerPage)
        }}
      />
    </Paper>
  )
}

export default ReportList
