import { ProductFieldEnum } from '../../../common/api/export'

export const organisationFields = [
  ProductFieldEnum.CATEGORY,
  ProductFieldEnum.COLLECTIONS,
  ProductFieldEnum.PRODUCT_TYPE,
]
export const financialFields = [ProductFieldEnum.CHARGE_TAXES]
export const seoFields = [
  ProductFieldEnum.DESCRIPTION,
  ProductFieldEnum.NAME,
  ProductFieldEnum.PRODUCT_MEDIA,
  ProductFieldEnum.VARIANT_MEDIA,
]
export const inventoryFields = [
  ProductFieldEnum.PRODUCT_WEIGHT,
  ProductFieldEnum.VARIANT_ID,
  ProductFieldEnum.VARIANT_SKU,
  ProductFieldEnum.VARIANT_WEIGHT,
]

export default {
  organisationFields,
  financialFields,
  seoFields,
  inventoryFields,
}
