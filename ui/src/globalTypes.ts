import {
  ExportObjectTypesEnum,
  FilterInfo,
  ProductSelectedColumnsInfo,
  ProductFieldEnum,
  OrderSelectedColumnsInfo,
  OrderFieldEnum,
} from './api/export/types'

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

export interface ExportStoreCommonData {
  fileType: FileType
  name: string
  id: number | null
  type: ExportObjectTypesEnum
  filter: FilterInfo | null
}

export interface ExportCommonStore extends ExportStoreCommonData {
  setFileType: (fileType: FileType) => void
  setName: (name: string) => void
  setId: (id: number | null) => void
  setType: (type: ExportObjectTypesEnum) => void
  setFilter: (filter: string | null) => void
  clear: () => void
}

export interface ExportProductColumns {
  columns: ProductSelectedColumnsInfo
}

export interface ExportProductColumnsStore extends ExportProductColumns {
  setColumns: (columns: ProductSelectedColumnsInfo) => void
  setChannels: (channels: string[]) => void
  setAttributes: (attributes: string[]) => void
  setWarehouses: (warehouses: string[]) => void
  setProductFields: (productFields: ProductFieldEnum[]) => void
  clear: () => void
}

export interface ExportOrderColumns {
  columns: OrderSelectedColumnsInfo
}

export interface ExportOrderColumnsStore extends ExportOrderColumns {
  setColumns: (columns: OrderSelectedColumnsInfo) => void
  setOrderFields: (orderFields: OrderFieldEnum[]) => void
  clear: () => void
}
