import React, { useMemo, useState } from 'react'
import { produce } from 'immer'
import {
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
  Typography,
} from '@material-ui/core'
import { Add as AddIcon } from '@material-ui/icons'

import { useFutherCommon } from '../../../../common/hooks/useCommon'
import { UserPills } from '../UserPills'
import { RecipientGroupPills } from '../RecipientGroupPills'
import { Label } from '../../../../common/components/Label'
import RecipientsTabs from '../RecipientsTabs'
import Pill from '../../../../common/components/Pill'

import { useStyles } from './styles'

export function Recipients() {
  const classes = useStyles()
  const { setRecipients, recipients } = useFutherCommon(state => ({
    recipients: state.recipients,
    setRecipients: state.setRecipients,
  }))
  const [isOpen, setIsOpen] = useState(false)
  const moreRecipients = useMemo(
    () => recipients.permissionGroups.length + recipients.users.length - 6,
    [recipients]
  )

  const checkAddMoreRecipients = (check: boolean) => {
    setRecipients(
      produce(recipients, draft => {
        draft.addMore = check
      })
    )
  }

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
          <UserPills />
          <RecipientGroupPills />
          {moreRecipients > 0 && <Pill label={`${moreRecipients} more...`} />}
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
