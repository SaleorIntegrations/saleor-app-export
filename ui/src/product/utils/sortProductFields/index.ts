import { ProductFieldEnum } from '../../../common/api/export/types'

const organisationsOptions = [
  ProductFieldEnum.CATEGORY,
  ProductFieldEnum.COLLECTIONS,
  ProductFieldEnum.PRODUCT_TYPE,
]
const financialsOptions = [ProductFieldEnum.CHARGE_TAXES]
const seoOptions = [
  ProductFieldEnum.DESCRIPTION,
  ProductFieldEnum.NAME,
  ProductFieldEnum.PRODUCT_MEDIA,
  ProductFieldEnum.VARIANT_MEDIA,
]
const inventoryOptions = [
  ProductFieldEnum.PRODUCT_WEIGHT,
  ProductFieldEnum.VARIANT_ID,
  ProductFieldEnum.VARIANT_SKU,
  ProductFieldEnum.VARIANT_WEIGHT,
]

export function sortProductFields(fields: ProductFieldEnum[]) {
  return {
    organisations: fields.filter(field => organisationsOptions.includes(field)),
    seo: fields.filter(field => seoOptions.includes(field)),
    financials: fields.filter(field => financialsOptions.includes(field)),
    inventory: fields.filter(field => inventoryOptions.includes(field)),
  }
}

export default sortProductFields
