import { produce } from 'immer'

import { TableReport } from '../../../globalTypes'

export interface Navigation {
  endCursor: string | null
  hasNext: boolean
  endPage: number
  page: number
}

export interface ReportsState {
  reports: TableReport[]
  navigation: Navigation
  total: number
}

export interface ReportsAction extends Partial<ReportsState> {
  type:
    | 'TOGGLE_REPORT'
    | 'SELECT_ALL'
    | 'UNSELECT_ALL'
    | 'SET_REPORTS'
    | 'SET_NAVIGATION'
    | 'SET_TOTAL'
    | 'DELETE_REPORT'
    | 'RESET'
  id?: number
}

export const initialReports: ReportsState = {
  reports: [],
  navigation: {
    hasNext: true,
    endCursor: '',
    endPage: 0,
    page: 0,
  },
  total: 0,
}

export const reportsReducer = (state: ReportsState, action: ReportsAction) => {
  switch (action.type) {
    case 'TOGGLE_REPORT':
      return produce(state, draft => {
        if (!action.id) return state
        const toSelectReport = draft.reports.find(
          report => report.id === action.id
        )
        if (toSelectReport)
          toSelectReport.isSelected = !toSelectReport.isSelected
      })
    case 'SELECT_ALL':
      return produce(state, draft => {
        draft.reports.forEach(report => (report.isSelected = true))
      })
    case 'UNSELECT_ALL':
      return produce(state, draft => {
        draft.reports.forEach(report => (report.isSelected = false))
      })
    case 'SET_REPORTS':
      return produce(state, draft => {
        draft.reports = action.reports || state.reports
      })
    case 'DELETE_REPORT':
      return produce(state, draft => {
        if (!action.id) return state
        draft.reports = draft.reports.filter(report => report.id !== action.id)
      })
    case 'SET_NAVIGATION':
      return produce(state, draft => {
        draft.navigation = action.navigation || state.navigation
      })
    case 'SET_TOTAL':
      return produce(state, draft => {
        draft.total = action.total || state.total
      })
    case 'RESET':
      return produce(state, draft => {
        draft.total = action.total || 0
        draft.navigation = action.navigation || {
          hasNext: true,
          endCursor: '',
          endPage: 0,
          page: 0,
        }
        draft.reports = action.reports || []
      })
    default:
      return state
  }
}
