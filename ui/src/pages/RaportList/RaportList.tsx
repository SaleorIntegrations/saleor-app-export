import React, { useEffect, useReducer, useState, useRef } from 'react'
import { Paper } from '@material-ui/core'

import { useMutationDeleteReport } from '../../api/mutations'
import { useQueryReports } from '../../api/queries'
import TableHeader from '../../components/TableHeader'
import RaportTable from '../../components/RaportTable'
import { raportsReducer, initialRaports } from './reducer'
import useStyles from './style'

export function RaportList() {
  const classes = useStyles()
  const headerRef = useRef<HTMLDivElement>(null)
  const [state, dispatch] = useReducer(raportsReducer, initialRaports)
  const [page, setPage] = useState(0)
  const [raportsPerPage, setRaportsPerPage] = useState(10)
  const [pureRaports, refetchPureRaports] = useQueryReports(
    {
      first: 25,
      after: state.navigation.endCursor,
    },
    { pause: true, requestPolicy: 'network-only' }
  )
  const [, deleteReportMutation] = useMutationDeleteReport()

  const reset = () => {
    dispatch({ type: 'SET_TOTAL', total: 0 })
    dispatch({ type: 'SET_RAPORTS', raports: [] })
    dispatch({
      type: 'SET_NAVIGATION',
      navigation: { endCursor: '', hasNext: true },
    })
  }

  const deleteSelectedReports = async () => {
    // TODO: implement delete reports
  }

  const deleteReport = async (id: number) => {
    const response = await deleteReportMutation(
      { reportId: id },
      { url: 'http://localhost:4321/graphql/' }
    )

    if (response.data && response.data.deleteReport.errors.length === 0) {
      reset()
      refetchPureRaports()
    }
  }

  useEffect(() => {
    if (pureRaports.data && !pureRaports.fetching) {
      dispatch({
        type: 'SET_RAPORTS',
        raports: [
          ...state.raports,
          ...pureRaports.data.reports.edges.map(({ node }) => ({
            isSelected: false,
            id: node.id,
            entity: node.type,
            recipients: 20,
            name: node.name,
          })),
        ],
      })
      dispatch({
        type: 'SET_NAVIGATION',
        navigation: {
          hasNext: pureRaports.data.reports.pageInfo.hasNext,
          endCursor: pureRaports.data.reports.pageInfo.endCursor,
        },
      })
      dispatch({
        type: 'SET_TOTAL',
        total: pureRaports.data.reports.totalCount,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pureRaports])

  useEffect(() => {
    if (state.navigation.hasNext) refetchPureRaports()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.navigation.endCursor])

  return (
    <Paper className={classes.paper}>
      <div ref={headerRef}>
        <TableHeader />
      </div>
      <RaportTable
        deleteSelectedRaports={deleteSelectedReports}
        deleteRaport={deleteReport}
        unselectAllRaports={() => dispatch({ type: 'UNSELECT_ALL' })}
        selectAllRaports={() => dispatch({ type: 'SELECT_ALL' })}
        toggleRaport={id => dispatch({ type: 'TOGGLE_RAPORT', id: id })}
        raports={state.raports}
        count={state.total}
        page={page}
        setPage={page => {
          setPage(page)
        }}
        rowsPerPage={raportsPerPage}
        setRowsPerPage={rowsPerPage => {
          reset()
          setPage(0)
          setRaportsPerPage(rowsPerPage)
        }}
        subtract={headerRef.current?.clientHeight}
      />
    </Paper>
  )
}

export default RaportList
