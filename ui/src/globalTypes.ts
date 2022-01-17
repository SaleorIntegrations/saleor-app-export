export enum FileType {
  CSV = 'CSV',
  XLSX = 'XLSX',
}

export interface TableReport {
  id: number
  name: string
  entity: string
  recipients: number
  isSelected: boolean
}
