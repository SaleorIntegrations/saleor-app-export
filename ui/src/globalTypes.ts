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

export enum FileType {
  CSV = "CSV",
  XLSX = "XLSX"
}

export interface ExportInfo {
  attributes: string[]
  channels: string[]
  fields: ProductField[]
  warehouses: string[]
}

export interface ProductFilterInput {
  isPublished: boolean
  collections: string[]
  categories: string[]
  hasCategory: boolean
  attributes: AttributeInput[]
  stockAvailability: StockAvailability
  stocks: ProductStockFilterInput
  search: string
  metadata: MetadataFilter[]
  price: PriceRangeInput
  minimalPrice: PriceRangeInput
  productTypes: string[]
  giftCard: boolean
  ids: string[]
  hasPreorderedVariants: boolean
  channel: string
}

export interface AttributeInput {
  slug: string
  values: string[]
  boolean: string
  valuesRange: IntRangeInput
  dateTime: DateTimeRangeInput
  date: DateRangeInput
}

export interface IntRangeInput {
  gte: number
  let: number
}

export interface DateTimeRangeInput {
  gte: Date
  let: Date
}

export interface DateRangeInput {
  gte: Date
  let: Date
}

export enum StockAvailability {
  IN_STOCK = 'IN_STOCK',
  OUT_OF_STOCK = 'OUT_OF_STOCK'
}

export interface ProductStockFilterInput {
  warehouseIds: string[]
  quantity: IntRangeInput
}

export interface MetadataFilter {
  key: string
  value: string
}

export interface PriceRangeInput {
  gte: number
  lte: number
}
