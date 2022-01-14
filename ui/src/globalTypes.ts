export enum ProductField {
  ID = 'ID',
  NAME = 'NAME',
  DESCRIPTION = "DESCRIPTION",
  PRODUCT_TYPE = "PRODUCT_TYPE",
  CATEGORY = "CATEGORY",
  PRODUCT_WEIGHT = "PRODUCT_WEIGHT",
  COLLECTIONS = "COLLECTIONS",
  CHARGE_TAXES = "CHARGE_TAXES",
  PRODUCT_MEDIA = "PRODUCT_MEDIA",
  VARIANT_ID = "VARIANT_ID",
  VARIANT_SKU = "VARIANT_SKU",
  VARIANT_WEIGHT = "VARIANT_WEIGHT",
  VARIANT_MEDIA = "VARIANT_MEDIA"
}

export enum OrderField {
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
  EMAIL = 'USER_EMAIL',
  SHIPPING_ADDRESS = 'SHIPPING_ADDRESS',
  BILLING_ADDRESS = 'BILLING_ADDRESS',
  ITEMS_SKU = 'LINES_SKU',
  PAYMENT_STATUS = 'PAYMENT_STATUS',
  GATEWAY = 'GATEWAY',
  PAYMENT_METHOD_TYPE = 'PAYMENT_METHOD_TYPE',
  TOTAL_BALANCE = 'TOTAL_BALANCE',
  TOTAL_CAPTURED = 'TOTAL_CAPTURED',
  TOTAL_AUTHORIZED = 'TOTAL_AUTHORIZED',
  STATUS = 'STATUS',
  TRACKING_NUMBER = 'TRACKING_NUMBER',
}

export enum FileType {
  CSV = "CSV",
  XLSX = "XLSX"
}

export enum ExportObjectTypesEnum {
  PRODUCTS = 'PRODUCTS',
  ORDERS = 'ORDERS'
}

export enum ReportErrorCode {
  NOT_FOUND = 'NOT_FOUND',
  INVALID_TYPE = 'INVALID_TYPE',
  INVALID_FILTER = 'INVALID_FILTER',
  LIMIT_EXCEEDED = 'LIMIT_EXCEEDED',
}

export interface ExportProductsInput {
  columns: ExportProductsInputColumns
  name: string
  filter?: {
    filterStr: string
  }
}

export interface ExportProductsInputColumns {
  attributes: string[]
  channels: string[]
  fields: ProductField[]
  warehouses: string[]
}

export interface ExportProductsInfo {
  attributes: string[]
  channels: string[]
  fields: {
    organisations: ProductField[]
    seo: ProductField[]
    financials: ProductField[]
    inventory: ProductField[]
  }
  warehouses: string[]
}

export interface ExportOrdersInfo {
  fields: {
    basic: OrderField[]
    financial: OrderField[]
    customer: OrderField[]
    items: OrderField[]
    payments: OrderField[]
    fulfillments: OrderField[]
  }
}

export interface TableRaport {
  id: number
  name: string
  entity: string
  recipients: number
  isSelected: boolean
}

export interface ProductExport {
  exportInfo: ExportProductsInfo
  filter: string | null
}

export interface OrderExport {
  filter: string | null
  exportInfo: ExportOrdersInfo
}
