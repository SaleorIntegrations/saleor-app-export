import { OrderFieldEnum } from '../../../common/api/export'
import fields from '../orderFields'

interface EnrichedOrderField {
  name: string
  value: OrderFieldEnum
}
const basicFields: EnrichedOrderField[] = [
  {
    name: 'ID',
    value: OrderFieldEnum.ID,
  },
  {
    name: 'Number',
    value: OrderFieldEnum.NUMBER,
  },
  {
    name: 'Created at',
    value: OrderFieldEnum.CREATED,
  },
  {
    name: 'Channel',
    value: OrderFieldEnum.CHANNEL,
  },
  {
    name: 'Language',
    value: OrderFieldEnum.LANGUAGE_CODE,
  },
  {
    name: 'Shipping method',
    value: OrderFieldEnum.SHIPPING_METHOD,
  },
]
const financialFields: EnrichedOrderField[] = [
  {
    name: 'Total',
    value: OrderFieldEnum.TOTAL,
  },
  {
    name: 'Subtotal',
    value: OrderFieldEnum.SUBTOTAL,
  },
  {
    name: 'Shipping price',
    value: OrderFieldEnum.SHIPPING_PRICE,
  },
  {
    name: 'Currency',
    value: OrderFieldEnum.CURRENCY,
  },
]
const customerFields: EnrichedOrderField[] = [
  {
    name: 'Email',
    value: OrderFieldEnum.USER_EMAIL,
  },
  {
    name: 'Shipping address',
    value: OrderFieldEnum.SHIPPING_ADDRESS,
  },
  {
    name: 'Billing address',
    value: OrderFieldEnum.BILLING_ADDRESS,
  },
]
const itemsFields: EnrichedOrderField[] = [
  {
    name: 'SKU',
    value: OrderFieldEnum.LINES_SKU,
  },
]
const paymentFields: EnrichedOrderField[] = [
  {
    name: 'Payments status',
    value: OrderFieldEnum.PAYMENT_STATUS,
  },
  {
    name: 'Gateway',
    value: OrderFieldEnum.GATEWAY,
  },
  {
    name: 'Payment method type',
    value: OrderFieldEnum.PAYMENT_METHOD_TYPE,
  },
  {
    name: 'Total balance',
    value: OrderFieldEnum.TOTAL_BALANCE,
  },
  {
    name: 'Total captured',
    value: OrderFieldEnum.TOTAL_CAPTURED,
  },
  {
    name: 'Total authorized',
    value: OrderFieldEnum.TOTAL_AUTHORIZED,
  },
]
const fulfillmentsFields: EnrichedOrderField[] = [
  {
    name: 'Status',
    value: OrderFieldEnum.STATUS,
  },
  {
    name: 'Tracking numbers',
    value: OrderFieldEnum.TRACKING_NUMBER,
  },
]

export const enrichedOrderFields: Record<
  keyof typeof fields,
  EnrichedOrderField[]
> = {
  basicFields,
  financialFields,
  customerFields,
  itemsFields,
  paymentFields,
  fulfillmentsFields,
}

export default enrichedOrderFields
