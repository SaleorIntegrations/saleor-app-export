import { OrderField } from '../../globalTypes'
import { ModalOption } from '../ModalSetting'

type FieldType = 'basic' | 'financial' | 'customer' | 'items' | 'payments' | 'fulfillments'

export const getFields = (comparator: OrderField[], field: FieldType): ModalOption[] => {
  const fields: Record<FieldType, ModalOption[]> = {
    'basic': [
      {
        id: 'ID_ID',
        name:'ID',
        slug: 'id_slug',
        checked: comparator.includes(OrderField.ID),
        value: OrderField.ID
      },
      {
        id: 'NUMBER_ID',
        name: 'Number',
        slug: 'number_slug',
        checked: comparator.includes(OrderField.NUMBER),
        value: OrderField.NUMBER
      },
      {
        id: 'CREATED_ID',
        name: 'Created at',
        slug: 'created_slug',
        checked: comparator.includes(OrderField.CREATED),
        value: OrderField.CREATED
      },
      {
        id: 'CHANNEL_ID',
        name: 'Channel',
        slug: 'channel_slug',
        checked: comparator.includes(OrderField.CHANNEL),
        value: OrderField.CHANNEL
      },
      {
        id: 'LANGUAGE_CODE_ID',
        name: 'Language',
        slug: 'language_slug',
        checked: comparator.includes(OrderField.LANGUAGE_CODE),
        value: OrderField.LANGUAGE_CODE
      },
      {
        id: 'SHIPPING_METHOD_ID',
        name: 'Shipping method',
        slug: 'shipping_method_slug',
        checked: comparator.includes(OrderField.SHIPPING_METHOD),
        value: OrderField.SHIPPING_METHOD
      }
    ],
    'financial': [
      {
        id: 'TOTAL_ID',
        name: 'Total',
        slug: 'total_slug',
        checked: comparator.includes(OrderField.TOTAL),
        value: OrderField.TOTAL
      },
      {
        id: 'SUBTOTAL_ID',
        name: 'Subtotal',
        slug: 'subtotal_slug',
        checked: comparator.includes(OrderField.SUBTOTAL),
        value: OrderField.SUBTOTAL
      },
      {
        id: 'SHIPPING_PRICE_ID',
        name: 'Shipping price',
        slug: 'shipping_price_slug',
        checked: comparator.includes(OrderField.SHIPPING_PRICE),
        value: OrderField.SHIPPING_PRICE
      },
      {
        id: 'CURRENCY_ID',
        name: 'Currency',
        slug: 'currency_slug',
        checked: comparator.includes(OrderField.CURRENCY),
        value: OrderField.CURRENCY
      }
    ],
    'customer': [
      {
        id: 'EMAIL_ID',
        name: 'Email',
        slug: 'email_slug',
        checked: comparator.includes(OrderField.EMAIL),
        value: OrderField.EMAIL
      },
      {
        id: 'SHIPPING_ADDRESS_ID',
        name: 'Shipping address',
        slug: 'shipping_address_slug',
        checked: comparator.includes(OrderField.SHIPPING_ADDRESS),
        value: OrderField.SHIPPING_ADDRESS
      },
      {
        id: 'BILLING_ADDRESS_ID',
        name: 'Billing address',
        slug: 'billing_address_slug',
        checked: comparator.includes(OrderField.BILLING_ADDRESS),
        value: OrderField.BILLING_ADDRESS
      }
    ],
    'fulfillments': [
      {
        id: 'STATUS_ID',
        name: 'Status',
        slug: 'status_slug',
        checked: comparator.includes(OrderField.STATUS),
        value: OrderField.STATUS
      },
      {
        id: 'TRACKING_NUMBER_ID',
        name: 'Tracking numbers',
        slug: 'tracking_numbers_slug',
        checked: comparator.includes(OrderField.TRACKING_NUMBER),
        value: OrderField.TRACKING_NUMBER
      },
    ],
    'items': [
      {
        id: 'ITEMS_SKU_ID',
        name: 'SKU',
        slug: 'items_sku_slug',
        checked: comparator.includes(OrderField.ITEMS_SKU),
        value: OrderField.ITEMS_SKU
      },
    ],
    'payments': [
      {
        id: 'PAYMENT_STATUS_ID',
        name: 'Payments status',
        slug: 'payment_status_slug',
        checked: comparator.includes(OrderField.PAYMENT_STATUS),
        value: OrderField.PAYMENT_STATUS
      },
      {
        id: 'GATEWAY_ID',
        name: 'Gateway',
        slug: 'gateway_slug',
        checked: comparator.includes(OrderField.GATEWAY),
        value: OrderField.GATEWAY
      },
      {
        id: 'PAYMENT_METHOD_TYPE_ID',
        name: 'Payment method type',
        slug: 'payment_method_type_slug',
        checked: comparator.includes(OrderField.PAYMENT_METHOD_TYPE),
        value: OrderField.PAYMENT_METHOD_TYPE
      },
      {
        id: 'TOTAL_BALANCE_ID',
        name: 'Total balance',
        slug: 'total_balance_slug',
        checked: comparator.includes(OrderField.TOTAL_BALANCE),
        value: OrderField.TOTAL_BALANCE
      },
      {
        id: 'TOTAL_CAPTURED_ID',
        name: 'Total captured',
        slug: 'total_captured_slug',
        checked: comparator.includes(OrderField.TOTAL_CAPTURED),
        value: OrderField.TOTAL_CAPTURED
      },
      {
        id: 'TOTAL_AUTHORIZED_ID',
        name: 'Total authorized',
        slug: 'total_authorized_slug',
        checked: comparator.includes(OrderField.TOTAL_AUTHORIZED),
        value: OrderField.TOTAL_AUTHORIZED
      },
    ]
  }

  return fields[field]
}

export default getFields
