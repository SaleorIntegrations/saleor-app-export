import { ProductFieldEnum } from '../../../common/api/export'
import fields from '../productFields'

interface EnrichedProductField {
  name: string
  value: ProductFieldEnum
}
const organisationFields: EnrichedProductField[] = [
  {
    name: 'Category',
    value: ProductFieldEnum.CATEGORY,
  },
  {
    name: 'Collections',
    value: ProductFieldEnum.COLLECTIONS,
  },
  {
    name: 'Type',
    value: ProductFieldEnum.PRODUCT_TYPE,
  },
]
const inventoryFields: EnrichedProductField[] = [
  {
    name: 'Export Product Weight',
    value: ProductFieldEnum.PRODUCT_WEIGHT,
  },
  {
    name: 'Export Variant ID',
    value: ProductFieldEnum.VARIANT_ID,
  },
  {
    name: 'Export Variant SKU',
    value: ProductFieldEnum.VARIANT_SKU,
  },
  {
    name: 'Export Variant Weight',
    value: ProductFieldEnum.VARIANT_WEIGHT,
  },
]
const financialFields: EnrichedProductField[] = [
  {
    name: 'Charge Taxes',
    value: ProductFieldEnum.CHARGE_TAXES,
  },
]
const seoFields: EnrichedProductField[] = [
  {
    name: 'Description',
    value: ProductFieldEnum.DESCRIPTION,
  },
  {
    name: 'Name',
    value: ProductFieldEnum.NAME,
  },
  {
    name: 'Product Images',
    value: ProductFieldEnum.PRODUCT_MEDIA,
  },
  {
    name: 'Variant Images',
    value: ProductFieldEnum.VARIANT_MEDIA,
  },
]

export const enrichedProductFields: Record<
  keyof typeof fields,
  EnrichedProductField[]
> = {
  organisationFields: organisationFields,
  inventoryFields: inventoryFields,
  financialFields: financialFields,
  seoFields: seoFields,
}

export default enrichedProductFields
