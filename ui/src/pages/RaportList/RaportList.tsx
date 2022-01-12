import React, { useEffect, useReducer, useState, useRef } from 'react'
import { Box, Paper } from '@material-ui/core'

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
    { pause: true }
  )

  const reset = () => {
    dispatch({ type: 'SET_TOTAL', total: 0 })
    dispatch({ type: 'SET_RAPORTS', raports: [] })
    dispatch({
      type: 'SET_NAVIGATION',
      navigation: { endCursor: '', hasNext: true },
    })
    setPage(0)
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
        deleteSelectedRaports={() => alert('delete selected')}
        deleteRaport={id => alert(`delete ${id}`)}
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
          setRaportsPerPage(rowsPerPage)
        }}
        subtract={headerRef.current?.clientHeight}
      />
    </Paper>
  )
}

export default RaportList
