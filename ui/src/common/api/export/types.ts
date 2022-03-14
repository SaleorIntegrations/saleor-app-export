export interface ReportResponse {
  report: Report | null
  errors: ReportError[]
}

export interface Report {
  id: number
  name: string
  type: ExportObjectTypesEnum
  filter: string | null
  columns: ProductSelectedColumnsInfo | OrderSelectedColumnsInfo
  recipients: RecipientInfo
}

export interface ReportError {
  code: ReportErrorCode
  message: string
  field: string
}

export enum ExportObjectTypesEnum {
  PRODUCTS = 'PRODUCTS',
  ORDERS = 'ORDERS',
}

export type SelectedColumnsInfo =
  | ProductSelectedColumnsInfo
  | OrderSelectedColumnsInfo

export type ProductSelectedColumnsInfo = {
  productFields: ProductFieldEnum[]
  attributes: string[]
  warehouses: string[]
  channels: string[]
}

export type OrderSelectedColumnsInfo = {
  orderFields: OrderFieldEnum[]
}

export enum ProductFieldEnum {
  ID = 'ID',
  NAME = 'NAME',
  DESCRIPTION = 'DESCRIPTION',
  PRODUCT_TYPE = 'PRODUCT_TYPE',
  CATEGORY = 'CATEGORY',
  PRODUCT_WEIGHT = 'PRODUCT_WEIGHT',
  COLLECTIONS = 'COLLECTIONS',
  CHARGE_TAXES = 'CHARGE_TAXES',
  PRODUCT_MEDIA = 'PRODUCT_MEDIA',
  VARIANT_ID = 'VARIANT_ID',
  VARIANT_SKU = 'VARIANT_SKU',
  VARIANT_WEIGHT = 'VARIANT_WEIGHT',
  VARIANT_MEDIA = 'VARIANT_MEDIA',
}

export enum OrderFieldEnum {
  ID = 'ID',
  NUMBER = 'NUMBER',
  CREATED = 'CREATED',
  CHANNEL = 'CHANNEL',
  LANGUAGE_CODE = 'LANGUAGE_CODE',
  SHIPPING_METHOD = 'SHIPPING_METHOD',
  CURRENCY = 'CURRENCY',
  TOTAL = 'TOTAL',
  SUBTOTAL = 'SUBTOTAL',
  SHIPPING_PRICE = 'SHIPPING_PRICE',
  USER_EMAIL = 'USER_EMAIL',
  SHIPPING_ADDRESS = 'SHIPPING_ADDRESS',
  BILLING_ADDRESS = 'BILLING_ADDRESS',
  LINES_SKU = 'BILLING_ADDRESS',
  PAYMENT_STATUS = 'PAYMENT_STATUS',
  GATEWAY = 'GATEWAY',
  PAYMENT_METHOD_TYPE = 'PAYMENT_METHOD_TYPE',
  TOTAL_BALANCE = 'TOTAL_BALANCE',
  TOTAL_CAPTURED = 'TOTAL_BALANCE',
  TOTAL_AUTHORIZED = 'TOTAL_AUTHORIZED',
  STATUS = 'STATUS',
  TRACKING_NUMBER = 'TRACKING_NUMBER',
}

export enum ReportErrorCode {
  NOT_FOUND = 'NOT_FOUND',
  INVALID_TYPE = 'INVALID_TYPE',
  INVALID_FILTER = 'INVALID_FILTER',
  LIMIT_EXCEEDED = 'LIMIT_EXCEEDED',
}

export interface RunReportResponse {
  job: Job | null
}

export interface Job {
  id: number
  createdAt: string
  report: Report
}

export interface DeleteReportResponse {
  errors: ReportError[]
}

export interface FilterInfo {
  filterStr: string
}

export interface ReportConnection {
  edges: ReportEdge[]
  pageInfo: PageInfo
  totalCount: number
}

export interface ReportEdge {
  node: Report
}

export interface PageInfo {
  hasNext: boolean
  endCursor: string | null
}

export interface RecipientInfo {
  users: string[]
  permissionGroups: string[]
}
