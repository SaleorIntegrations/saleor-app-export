import { ProductField } from '../globalTypes'

const organisationsOptions = [
  ProductField.CATEGORY,
  ProductField.COLLECTIONS,
  ProductField.PRODUCT_TYPE,
]
const financialsOptions = [ProductField.CHARGE_TAXES]
const seoOptions = [
  ProductField.DESCRIPTION,
  ProductField.NAME,
  ProductField.PRODUCT_MEDIA,
  ProductField.VARIANT_MEDIA,
]
const inventoryOptions = [
  ProductField.PRODUCT_WEIGHT,
  ProductField.VARIANT_ID,
  ProductField.VARIANT_SKU,
  ProductField.VARIANT_WEIGHT,
]

export function sortProductFields(fields: ProductField[]) {
  return {
    organisations: fields.filter(field => organisationsOptions.includes(field)),
    seo: fields.filter(field => seoOptions.includes(field)),
    financials: fields.filter(field => financialsOptions.includes(field)),
    inventory: fields.filter(field => inventoryOptions.includes(field)),
  }
}

export default sortProductFields
