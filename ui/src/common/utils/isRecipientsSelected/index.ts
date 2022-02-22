import { RecipientInfo } from '../../../api/export/types'

export const isRecipientsSelected = (recipients: RecipientInfo): boolean =>
  Boolean(Object.values(recipients).flat().length - 1)

export default isRecipientsSelected
