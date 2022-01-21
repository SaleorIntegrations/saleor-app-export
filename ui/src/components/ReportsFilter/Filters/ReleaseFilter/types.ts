import { DateTime } from '../../FilterButton/reducer'

export enum QueryAction {
  setToTime = 'SET_TO_TIME',
  setToDate = 'SET_TO_DATE',
  setFromTime = 'SET_FROM_TIME',
  setFromDate = 'SET_FROM_DATE',
}

export interface DateQuery {
  to: DateTime
  from: DateTime
}
