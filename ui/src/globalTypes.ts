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
  USER_EMAIL = 'USER_EMAIL',
  SHIPPING_ADDRESS = 'SHIPPING_ADDRESS',
  BILLING_ADDRESS = 'BILLING_ADDRESS',
  LINES_SKU = 'LINES_SKU',
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

export interface ExportProductsInput {
  columns: ExportInfo
  name: string
  filter: {
    filterStr: string
  }
}

export interface ExportInfo {
  attributes: string[]
  channels: string[]
  fields: ProductField[]
  warehouses: string[]
}

export interface TableRaport {
  id: number
  name: string
  entity: string
  recipients: number
  isSelected: boolean
}
