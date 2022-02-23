import { OrderFieldEnum } from '../../../common/api/export/types'
import { ModalOption } from '../../../common/components/ModalSetting'

type FieldType =
  | 'basic'
  | 'financial'
  | 'customer'
  | 'items'
  | 'payments'
  | 'fulfillments'

export const getFields = (
  comparator: OrderFieldEnum[],
  field: FieldType
): ModalOption[] => {
  const fields: Record<FieldType, ModalOption[]> = {
    basic: [
      {
        id: 'ID_ID',
        name: 'ID',
        slug: 'id_slug',
        checked: comparator.includes(OrderFieldEnum.ID),
        value: OrderFieldEnum.ID,
      },
      {
        id: 'NUMBER_ID',
        name: 'Number',
        slug: 'number_slug',
        checked: comparator.includes(OrderFieldEnum.NUMBER),
        value: OrderFieldEnum.NUMBER,
      },
      {
        id: 'CREATED_ID',
        name: 'Created at',
        slug: 'created_slug',
        checked: comparator.includes(OrderFieldEnum.CREATED),
        value: OrderFieldEnum.CREATED,
      },
      {
        id: 'CHANNEL_ID',
        name: 'Channel',
        slug: 'channel_slug',
        checked: comparator.includes(OrderFieldEnum.CHANNEL),
        value: OrderFieldEnum.CHANNEL,
      },
      {
        id: 'LANGUAGE_CODE_ID',
        name: 'Language',
        slug: 'language_slug',
        checked: comparator.includes(OrderFieldEnum.LANGUAGE_CODE),
        value: OrderFieldEnum.LANGUAGE_CODE,
      },
      {
        id: 'SHIPPING_METHOD_ID',
        name: 'Shipping method',
        slug: 'shipping_method_slug',
        checked: comparator.includes(OrderFieldEnum.SHIPPING_METHOD),
        value: OrderFieldEnum.SHIPPING_METHOD,
      },
    ],
    financial: [
      {
        id: 'TOTAL_ID',
        name: 'Total',
        slug: 'total_slug',
        checked: comparator.includes(OrderFieldEnum.TOTAL),
        value: OrderFieldEnum.TOTAL,
      },
      {
        id: 'SUBTOTAL_ID',
        name: 'Subtotal',
        slug: 'subtotal_slug',
        checked: comparator.includes(OrderFieldEnum.SUBTOTAL),
        value: OrderFieldEnum.SUBTOTAL,
      },
      {
        id: 'SHIPPING_PRICE_ID',
        name: 'Shipping price',
        slug: 'shipping_price_slug',
        checked: comparator.includes(OrderFieldEnum.SHIPPING_PRICE),
        value: OrderFieldEnum.SHIPPING_PRICE,
      },
      {
        id: 'CURRENCY_ID',
        name: 'Currency',
        slug: 'currency_slug',
        checked: comparator.includes(OrderFieldEnum.CURRENCY),
        value: OrderFieldEnum.CURRENCY,
      },
    ],
    customer: [
      {
        id: 'EMAIL_ID',
        name: 'Email',
        slug: 'email_slug',
        checked: comparator.includes(OrderFieldEnum.USER_EMAIL),
        value: OrderFieldEnum.USER_EMAIL,
      },
      {
        id: 'SHIPPING_ADDRESS_ID',
        name: 'Shipping address',
        slug: 'shipping_address_slug',
        checked: comparator.includes(OrderFieldEnum.SHIPPING_ADDRESS),
        value: OrderFieldEnum.SHIPPING_ADDRESS,
      },
      {
        id: 'BILLING_ADDRESS_ID',
        name: 'Billing address',
        slug: 'billing_address_slug',
        checked: comparator.includes(OrderFieldEnum.BILLING_ADDRESS),
        value: OrderFieldEnum.BILLING_ADDRESS,
      },
    ],
    fulfillments: [
      {
        id: 'STATUS_ID',
        name: 'Status',
        slug: 'status_slug',
        checked: comparator.includes(OrderFieldEnum.STATUS),
        value: OrderFieldEnum.STATUS,
      },
      {
        id: 'TRACKING_NUMBER_ID',
        name: 'Tracking numbers',
        slug: 'tracking_numbers_slug',
        checked: comparator.includes(OrderFieldEnum.TRACKING_NUMBER),
        value: OrderFieldEnum.TRACKING_NUMBER,
      },
    ],
    items: [
      {
        id: 'ITEMS_SKU_ID',
        name: 'SKU',
        slug: 'items_sku_slug',
        checked: comparator.includes(OrderFieldEnum.LINES_SKU),
        value: OrderFieldEnum.LINES_SKU,
      },
    ],
    payments: [
      {
        id: 'PAYMENT_STATUS_ID',
        name: 'Payments status',
        slug: 'payment_status_slug',
        checked: comparator.includes(OrderFieldEnum.PAYMENT_STATUS),
        value: OrderFieldEnum.PAYMENT_STATUS,
      },
      {
        id: 'GATEWAY_ID',
        name: 'Gateway',
        slug: 'gateway_slug',
        checked: comparator.includes(OrderFieldEnum.GATEWAY),
        value: OrderFieldEnum.GATEWAY,
      },
      {
        id: 'PAYMENT_METHOD_TYPE_ID',
        name: 'Payment method type',
        slug: 'payment_method_type_slug',
        checked: comparator.includes(OrderFieldEnum.PAYMENT_METHOD_TYPE),
        value: OrderFieldEnum.PAYMENT_METHOD_TYPE,
      },
      {
        id: 'TOTAL_BALANCE_ID',
        name: 'Total balance',
        slug: 'total_balance_slug',
        checked: comparator.includes(OrderFieldEnum.TOTAL_BALANCE),
        value: OrderFieldEnum.TOTAL_BALANCE,
      },
      {
        id: 'TOTAL_CAPTURED_ID',
        name: 'Total captured',
        slug: 'total_captured_slug',
        checked: comparator.includes(OrderFieldEnum.TOTAL_CAPTURED),
        value: OrderFieldEnum.TOTAL_CAPTURED,
      },
      {
        id: 'TOTAL_AUTHORIZED_ID',
        name: 'Total authorized',
        slug: 'total_authorized_slug',
        checked: comparator.includes(OrderFieldEnum.TOTAL_AUTHORIZED),
        value: OrderFieldEnum.TOTAL_AUTHORIZED,
      },
    ],
  }

  return fields[field]
}

export default getFields
