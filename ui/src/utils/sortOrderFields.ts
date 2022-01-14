import { OrderField } from '../globalTypes'

const basicOptions = [
  OrderField.ID,
  OrderField.NUMBER,
  OrderField.CREATED,
  OrderField.CHANNEL,
  OrderField.LANGUAGE_CODE,
  OrderField.SHIPPING_METHOD,
]
const financialOptions = [
  OrderField.TOTAL,
  OrderField.SUBTOTAL,
  OrderField.SHIPPING_PRICE,
  OrderField.CURRENCY,
]
const customerOptions = [
  OrderField.EMAIL,
  OrderField.SHIPPING_ADDRESS,
  OrderField.BILLING_ADDRESS,
]
const itemsOptions = [OrderField.ITEMS_SKU]
const paymentOptions = [
  OrderField.PAYMENT_STATUS,
  OrderField.GATEWAY,
  OrderField.PAYMENT_METHOD_TYPE,
  OrderField.TOTAL_BALANCE,
  OrderField.TOTAL_CAPTURED,
  OrderField.TOTAL_AUTHORIZED,
]
const fulfillmentsOpions = [OrderField.STATUS, OrderField.TRACKING_NUMBER]

export function sortOrderFields(fields: OrderField[]) {
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
