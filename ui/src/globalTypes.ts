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
