import React, { useEffect, useState } from 'react'
import { produce } from 'immer'
import {
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
  Typography,
} from '@material-ui/core'
import { Add as AddIcon, Close as CloseIcon } from '@material-ui/icons'

import { SurfaceModal } from '../SurfaceModal'
import { CheckboxList, CheckboxListOption } from '../CheckboxList'
import { useQueryStaffUsers } from '../../api/saleor/query/staffUsers'
import { useExportCommonStore } from '../../hooks/useExportCommonStore'
import { useCurrentUserStore } from '../../hooks/useCurrentUserStore'
import { Label } from '../Label'

import { useStyles } from './styles'
import SearchInput from '../SearchInput'

type Navigation = {
  endCursor: null | string
  hasNext: boolean
}

export function Recipients() {
  const classes = useStyles()
  const [users, setUsers] = useExportCommonStore(state => [
    state.recipients.users,
    state.setUsers,
  ])
  const currentUserId = useCurrentUserStore(state => state.user.id)
  const [checked, setChecked] = useState(
    Boolean(users.filter(userId => userId !== currentUserId).length)
  )
  const [navigation, setNavigation] = useState<Navigation>({
    endCursor: null,
    hasNext: true,
  })
  const [fetchedStaff, refetchStaffUsers] = useQueryStaffUsers(
    { first: 100, after: navigation.endCursor },
    { pause: true }
  )
  const [isOpen, setIsOpen] = useState(false)
  const [staff, setStaff] = useState<CheckboxListOption[]>([])
  const [staffCopy, setStaffCopy] = useState<CheckboxListOption[]>([])
  const [search, setSearch] = useState('')

  const onSave = () => {
    setIsOpen(false)
    setStaff(staffCopy)
    setUsers([
      currentUserId,
      ...staffCopy
        .filter(staffUser => staffUser.checked === true)
        .map(staffUser => staffUser.id),
    ])
  }

  const onCancel = () => {
    setIsOpen(false)
    setStaffCopy(staff)
  }

  const onCheck = (value: boolean) => {
    setChecked(value)

    if (value) {
      setUsers([
        currentUserId,
        ...staff
          .filter(staffUser => staffUser.checked === true)
          .map(staffUser => staffUser.id),
      ])
    } else {
      setUsers([currentUserId])
    }
  }

  const onDelete = (id: string) => {
    setStaff(
      produce(draft => {
        const staff = draft.find(staff => staff.id === id)
        if (staff) staff.checked = false
      })
    )
    setUsers(users.filter(userId => userId !== id))
  }

  useEffect(() => {
    if (fetchedStaff.data) {
      const { edges, pageInfo } = fetchedStaff.data.staffUsers
      setStaff([
        ...staff,
        ...edges
          .map(({ node }) => ({
            id: node.id,
            name: node.firstName
              ? `${node.firstName} ${node.lastName}`
              : node.email,
            value: node.id,
            checked: users.includes(node.id),
          }))
          .filter(option => option.id !== currentUserId),
      ])

      setNavigation({
        endCursor: pageInfo.endCursor,
        hasNext: pageInfo.hasNextPage,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchedStaff.data])

  useEffect(() => {
    if (navigation.hasNext) {
      refetchStaffUsers()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation])

  useEffect(() => {
    setStaffCopy(staff)
  }, [staff])

  if (fetchedStaff.fetching || navigation.hasNext) return <div>Loading...</div>

  return (
    <Box>
      <Label>RECIPIENTS</Label>
      <FormControlLabel
        label="Add more recipients"
        control={
          <Checkbox checked={checked} onChange={(_, value) => onCheck(value)} />
        }
      />
      {checked && (
        <>
          <Box className={classes.recipientsBox}>
            <Typography className={classes.boxTitle}>Recipients</Typography>
            {staff
              .filter(user => user.checked)
              .map(user => (
                <Box
                  className={classes.recipient}
                  key={user.id}
                  onClick={() => onDelete(user.id)}
                >
                  {user.name} <CloseIcon />
                </Box>
              ))}
            <IconButton onClick={() => setIsOpen(true)} size="small">
              <AddIcon />
            </IconButton>
          </Box>
          <SurfaceModal isOpen={isOpen} onClose={onCancel} onSave={onSave}>
            <Typography variant="h5">Select Recipients</Typography>
            <Box margin="1.2rem 0">
              <SearchInput
                onChange={event => setSearch(event.target.value)}
                value={search}
              />
            </Box>
            <CheckboxList
              options={staffCopy}
              mainCheckboxTitle="Select all recipients"
              subCheckboxTitle="Send the report to all recipients"
              setOptions={setStaffCopy}
              filter={option => option.name.includes(search)}
            />
          </SurfaceModal>
        </>
      )}
    </Box>
  )
}

export default Recipients
