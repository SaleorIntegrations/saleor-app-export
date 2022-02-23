import { ProductFieldEnum } from '../../../common/api/export/types'
import { ModalOption } from '../../../common/components/ModalSetting'

type FieldType = 'organisations' | 'financials' | 'inventory' | 'seo'

export const getFields = (
  comparator: ProductFieldEnum[],
  field: FieldType
): ModalOption[] => {
  const fields: Record<FieldType, ModalOption[]> = {
    organisations: [
      {
        id: 'CATEGORY_ID',
        name: 'Category',
        slug: 'category_slug',
        checked: comparator.includes(ProductFieldEnum.CATEGORY),
        value: ProductFieldEnum.CATEGORY,
      },
      {
        id: 'COLLECTIONS_ID',
        name: 'Collections',
        slug: 'Collections_slug',
        checked: comparator.includes(ProductFieldEnum.COLLECTIONS),
        value: ProductFieldEnum.COLLECTIONS,
      },
      {
        id: 'PRODUCT_TYPE_ID',
        name: 'Type',
        slug: 'Product_type_slug',
        checked: comparator.includes(ProductFieldEnum.PRODUCT_TYPE),
        value: ProductFieldEnum.PRODUCT_TYPE,
      },
    ],
    inventory: [
      {
        id: 'PRODUCT_WEIGHT_ID',
        name: 'Export Product Weight',
        slug: 'product_weight_slug',
        checked: comparator.includes(ProductFieldEnum.PRODUCT_WEIGHT),
        value: ProductFieldEnum.PRODUCT_WEIGHT,
      },
      {
        id: 'VARIANT_ID_ID',
        name: 'Export Variant ID',
        slug: 'variant_id_slug',
        checked: comparator.includes(ProductFieldEnum.VARIANT_ID),
        value: ProductFieldEnum.VARIANT_ID,
      },
      {
        id: 'VARIANT_SKU_ID',
        name: 'Export Variant SKU',
        slug: 'variant_sku_slug',
        checked: comparator.includes(ProductFieldEnum.VARIANT_SKU),
        value: ProductFieldEnum.VARIANT_SKU,
      },
      {
        id: 'VARIANT_WEIGHT_ID',
        name: 'Export Variant Weight',
        slug: 'variant_weight_slug',
        checked: comparator.includes(ProductFieldEnum.VARIANT_WEIGHT),
        value: ProductFieldEnum.VARIANT_WEIGHT,
      },
    ],
    financials: [
      {
        id: 'CHARGE_TAXES_ID',
        name: 'Charge Taxes',
        slug: 'charge_taxes_slug',
        checked: comparator.includes(ProductFieldEnum.CHARGE_TAXES),
        value: ProductFieldEnum.CHARGE_TAXES,
      },
    ],
    seo: [
      {
        id: 'DESCRIPTION_ID',
        name: 'Description',
        slug: 'description_slug',
        checked: comparator.includes(ProductFieldEnum.DESCRIPTION),
        value: ProductFieldEnum.DESCRIPTION,
      },
      {
        id: 'NAME_ID',
        name: 'Name',
        slug: 'name_slug',
        checked: comparator.includes(ProductFieldEnum.NAME),
        value: ProductFieldEnum.NAME,
      },
      {
        id: 'PRODUCT_MEDIA_ID',
        name: 'Product Images',
        slug: 'product_media_slug',
        checked: comparator.includes(ProductFieldEnum.PRODUCT_MEDIA),
        value: ProductFieldEnum.PRODUCT_MEDIA,
      },
      {
        id: 'VARIANT_MEDIA_ID',
        name: 'Variant Images',
        slug: 'variant_images_slug',
        checked: comparator.includes(ProductFieldEnum.VARIANT_MEDIA),
        value: ProductFieldEnum.VARIANT_MEDIA,
      },
    ],
  }

  return fields[field]
}

export default getFields
