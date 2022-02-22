import { OrderFieldEnum } from '../../../api/export/types'

const basicOptions = [
  OrderFieldEnum.ID,
  OrderFieldEnum.NUMBER,
  OrderFieldEnum.CREATED,
  OrderFieldEnum.CHANNEL,
  OrderFieldEnum.LANGUAGE_CODE,
  OrderFieldEnum.SHIPPING_METHOD,
]
const financialOptions = [
  OrderFieldEnum.TOTAL,
  OrderFieldEnum.SUBTOTAL,
  OrderFieldEnum.SHIPPING_PRICE,
  OrderFieldEnum.CURRENCY,
]
const customerOptions = [
  OrderFieldEnum.USER_EMAIL,
  OrderFieldEnum.SHIPPING_ADDRESS,
  OrderFieldEnum.BILLING_ADDRESS,
]
const itemsOptions = [OrderFieldEnum.LINES_SKU]
const paymentOptions = [
  OrderFieldEnum.PAYMENT_STATUS,
  OrderFieldEnum.GATEWAY,
  OrderFieldEnum.PAYMENT_METHOD_TYPE,
  OrderFieldEnum.TOTAL_BALANCE,
  OrderFieldEnum.TOTAL_CAPTURED,
  OrderFieldEnum.TOTAL_AUTHORIZED,
]
const fulfillmentsOpions = [
  OrderFieldEnum.STATUS,
  OrderFieldEnum.TRACKING_NUMBER,
]

export function sortOrderFields(fields: OrderFieldEnum[]) {
  return {
    basic: fields.filter(field => basicOptions.includes(field)),
    financial: fields.filter(field => financialOptions.includes(field)),
    customer: fields.filter(field => customerOptions.includes(field)),
    items: fields.filter(field => itemsOptions.includes(field)),
    payments: fields.filter(field => paymentOptions.includes(field)),
    fulfillments: fields.filter(field => fulfillmentsOpions.includes(field)),
  }
}

export default sortOrderFields
