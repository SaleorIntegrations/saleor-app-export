import {
  ExportObjectTypesEnum,
  FilterInfo,
  ProductSelectedColumnsInfo,
  ProductFieldEnum,
  OrderSelectedColumnsInfo,
  OrderFieldEnum,
  RecipientInfo,
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
  filter: FilterInfo | null
  recipients: RecipientInfo
}

export interface ExportCommonStore extends ExportStoreCommonData {
  setFileType: (fileType: FileType) => void
  setName: (name: string) => void
  setId: (id: number | null) => void
  setFilter: (filter: string | null) => void
  setUsers: (users: string[] | null) => void
  setPermissionGroups: (permissionGroups: string[] | null) => void
  initialize: (data: ExportStoreCommonData) => void
  reset: () => void
}

export interface ExportProductColumns {
  type: ExportObjectTypesEnum.PRODUCTS
  columns: ProductSelectedColumnsInfo
}

export interface ExportProductColumnsStore extends ExportProductColumns {
  setColumns: (columns: ProductSelectedColumnsInfo) => void
  setChannels: (channels: string[]) => void
  setAttributes: (attributes: string[]) => void
  setWarehouses: (warehouses: string[]) => void
  setProductFields: (productFields: ProductFieldEnum[]) => void
  reset: () => void
}

export interface ExportOrderColumns {
  type: ExportObjectTypesEnum.ORDERS
  columns: OrderSelectedColumnsInfo
}

export interface ExportOrderColumnsStore extends ExportOrderColumns {
  setColumns: (columns: OrderSelectedColumnsInfo) => void
  setOrderFields: (orderFields: OrderFieldEnum[]) => void
  reset: () => void
}
