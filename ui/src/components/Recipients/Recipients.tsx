import React, { useCallback, useState } from 'react'
import { produce } from 'immer'
import {
  Box,
  Checkbox,
  Chip,
  FormControlLabel,
  IconButton,
  Typography,
} from '@material-ui/core'
import { Add as AddIcon, Close as CloseIcon } from '@material-ui/icons'

import { useExportCommonStore } from '../../hooks/useExportCommonStore'
import { useCurrentUserStore } from '../../hooks/useCurrentUserStore'
// import { isRecipientsSelected } from '../../utils'
import { Label } from '../Label'

import { useStyles } from './styles'
import RecipientsTabs from '../RecipientsTabs'

export function Recipients() {
  const classes = useStyles()
  const { setRecipients, recipients } = useExportCommonStore(state => ({
    recipients: state.recipients,
    setRecipients: state.setRecipients,
  }))
  const currentUserId = useCurrentUserStore(state => state.user.id)
  const [isOpen, setIsOpen] = useState(false)

  const onDelete = (id: string) => {
    setRecipients(
      produce(recipients, draft => {
        draft.permissionGroups = draft.permissionGroups.filter(
          groupId => groupId !== id
        )
        draft.users = draft.users.filter(userId => userId !== id)
      })
    )
  }

  const checkAddMoreRecipients = (check: boolean) => {
    setRecipients(
      produce(recipients, draft => {
        draft.addMore = check
      })
    )
  }

  const getRecipientsChip = useCallback(() => {
    return Object.values({
      users: recipients.users,
      groups: recipients.permissionGroups,
    })
      .flat()
      .filter(id => id !== currentUserId)
  }, [currentUserId, recipients.permissionGroups, recipients.users])

  return (
    <Box>
      <Label>RECIPIENTS</Label>
      <FormControlLabel
        label="Add more recipients"
        control={
          <Checkbox
            checked={recipients.addMore}
            onChange={(_, value) => checkAddMoreRecipients(value)}
          />
        }
      />
      {recipients.addMore && (
        <Box className={classes.recipientsBox}>
          <Typography className={classes.boxTitle}>Recipients</Typography>
          {getRecipientsChip()
            .slice(0, 5)
            .map(recipient => (
              <Chip
                className={classes.recipient}
                deleteIcon={<CloseIcon />}
                variant="default"
                label={recipient}
                key={recipient}
                onDelete={() => onDelete(recipient)}
              />
            ))}
          {getRecipientsChip().length - 5 > 0 && (
            <Chip
              className={classes.recipient}
              variant="default"
              label={`${getRecipientsChip().length - 5} more...`}
              onClick={() => setIsOpen(true)}
            />
          )}
          <IconButton onClick={() => setIsOpen(true)} size="small">
            <AddIcon />
          </IconButton>
          <RecipientsTabs isOpen={isOpen} setIsOpen={setIsOpen} />
        </Box>
      )}
    </Box>
  )
}

export default Recipients
