import { OrderFieldEnum } from '../../../common/api/export'

export const basicFields = [
  OrderFieldEnum.ID,
  OrderFieldEnum.NUMBER,
  OrderFieldEnum.CREATED,
  OrderFieldEnum.CHANNEL,
  OrderFieldEnum.LANGUAGE_CODE,
  OrderFieldEnum.SHIPPING_METHOD,
]
const financialFields = [
  OrderFieldEnum.TOTAL,
  OrderFieldEnum.SUBTOTAL,
  OrderFieldEnum.SHIPPING_PRICE,
  OrderFieldEnum.CURRENCY,
]
const customerFields = [
  OrderFieldEnum.USER_EMAIL,
  OrderFieldEnum.SHIPPING_ADDRESS,
  OrderFieldEnum.BILLING_ADDRESS,
]
const itemsFields = [OrderFieldEnum.LINES_SKU]
const paymentFields = [
  OrderFieldEnum.PAYMENT_STATUS,
  OrderFieldEnum.GATEWAY,
  OrderFieldEnum.PAYMENT_METHOD_TYPE,
  OrderFieldEnum.TOTAL_BALANCE,
  OrderFieldEnum.TOTAL_CAPTURED,
  OrderFieldEnum.TOTAL_AUTHORIZED,
]
const fulfillmentsFields = [
  OrderFieldEnum.STATUS,
  OrderFieldEnum.TRACKING_NUMBER,
]

export default {
  basicFields,
  financialFields,
  customerFields,
  itemsFields,
  paymentFields,
  fulfillmentsFields,
}
