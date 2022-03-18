export enum FileType {
  CSV = 'CSV',
  XLSX = 'XLSX',
}

export interface TableReport {
  id: number
  name: string
  entity: string
  recipients: number
  groups: number
  isSelected: boolean
}

export enum ExportFrequency {
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  BIWEEKLY = 'BIWEEKLY',
  MONTHLY = 'MONTHLY',
  QUARTERLY = 'QUARTERLY',
  YEARLY = 'YEARLY',
}

export enum TimezoneEnum {
  LOCAL = 'LOCAL',
  CHANNEL = 'CHANNEL',
  UTC = 'UTC',
}

export type Filter = {
  query: string
}
