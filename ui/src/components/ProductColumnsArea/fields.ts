import { ProductField } from '../../globalTypes'
import { ModalOption } from '../ModalSetting'

type FieldType = 'organisations' | 'financials' | 'inventory' | 'seo'

export const getFields = (comparator: ProductField[], field: FieldType): ModalOption[] => {
  const fields: Record<FieldType, ModalOption[]> = {
    'organisations': [
      {
        id: 'CATEGORY_ID',
        name: 'Category',
        slug: 'category_slug',
        checked:
          comparator.includes(
            ProductField.CATEGORY
          ),
        value: ProductField.CATEGORY,
      },
      {
        id: 'COLLECTIONS_ID',
        name: 'Collections',
        slug: 'Collections_slug',
        checked:
          comparator.includes(
            ProductField.COLLECTIONS
          ),
        value: ProductField.COLLECTIONS,
      },
      {
        id: 'PRODUCT_TYPE_ID',
        name: 'Type',
        slug: 'Product_type_slug',
        checked:
          comparator.includes(
            ProductField.PRODUCT_TYPE
          ),
        value: ProductField.PRODUCT_TYPE,
      },
    ],
    'inventory': [
      {
        id: 'PRODUCT_WEIGHT_ID',
        name: 'Export Product Weight',
        slug: 'product_weight_slug',
        checked: comparator.includes(
          ProductField.PRODUCT_WEIGHT
        ),
        value: ProductField.PRODUCT_WEIGHT,
      },
      {
        id: 'VARIANT_ID_ID',
        name: 'Export Variant ID',
        slug: 'variant_id_slug',
        checked: comparator.includes(
          ProductField.VARIANT_ID
        ),
        value: ProductField.VARIANT_ID,
      },
      {
        id: 'VARIANT_SKU_ID',
        name: 'Export Variant SKU',
        slug: 'variant_sku_slug',
        checked: comparator.includes(
          ProductField.VARIANT_SKU
        ),
        value: ProductField.VARIANT_SKU,
      },
      {
        id: 'VARIANT_WEIGHT_ID',
        name: 'Export Variant Weight',
        slug: 'variant_weight_slug',
        checked: comparator.includes(
          ProductField.VARIANT_WEIGHT
        ),
        value: ProductField.VARIANT_WEIGHT,
      },
    ],
    'financials': [
      {
        id: 'CHARGE_TAXES_ID',
        name: 'Charge Taxes',
        slug: 'charge_taxes_slug',
        checked: comparator.includes(
          ProductField.CHARGE_TAXES
        ),
        value: ProductField.CHARGE_TAXES,
      },
    ],
    'seo': [
      {
        id: 'DESCRIPTION_ID',
        name: 'Description',
        slug: 'description_slug',
        checked: comparator.includes(
          ProductField.DESCRIPTION
        ),
        value: ProductField.DESCRIPTION,
      },
      {
        id: 'NAME_ID',
        name: 'Name',
        slug: 'name_slug',
        checked: comparator.includes(
          ProductField.NAME
        ),
        value: ProductField.NAME,
      },
      {
        id: 'PRODUCT_MEDIA_ID',
        name: 'Product Images',
        slug: 'product_media_slug',
        checked: comparator.includes(
          ProductField.PRODUCT_MEDIA
        ),
        value: ProductField.PRODUCT_MEDIA,
      },
      {
        id: 'VARIANT_MEDIA_ID',
        name: 'Variant Images',
        slug: 'variant_images_slug',
        checked: comparator.includes(
          ProductField.VARIANT_MEDIA
        ),
        value: ProductField.VARIANT_MEDIA,
      },
    ]
  }

  return fields[field]
}

export default getFields
