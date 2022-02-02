import React, { useEffect, useState } from 'react'
import { produce } from 'immer'
import {
  Box,
  Checkbox,
  Chip,
  FormControlLabel,
  IconButton,
  Tab,
  Tabs,
  Typography,
} from '@material-ui/core'
import { Add as AddIcon, Close as CloseIcon } from '@material-ui/icons'

import { SurfaceModal } from '../SurfaceModal'
import { CheckboxListOption } from '../CheckboxList'
// import { useQueryStaffUsers } from '../../api/saleor/query/staffUsers'
import { useExportCommonStore } from '../../hooks/useExportCommonStore'
import { useCurrentUserStore } from '../../hooks/useCurrentUserStore'
import { RecipientsList } from '../RecipientsList'
import { Label } from '../Label'

import { useStyles } from './styles'
import { PermissionGroupsList } from '../PermissionGroupsList'
// import SearchInput from '../SearchInput'
// import { useQueryPermissionGroups } from '../../api/saleor'

// type Navigation = {
//   // users: {
//   //   endCursor: null | string
//   //   hasNext: boolean
//   // }
//   groups: {
//     endCursor: null | string
//     hasNext: boolean
//   }
// }

enum TabPage {
  GROUP = 'GROUP',
  USER = 'USER',
}

export function Recipients() {
  const classes = useStyles()
  const { users, setUsers, permissionGroups, setPermissionGroups } =
    useExportCommonStore(state => ({
      users: state.recipients.users,
      setUsers: state.setUsers,
      permissionGroups: state.recipients.permissionGroups,
      setPermissionGroups: state.setPermissionGroups,
    }))
  const currentUserId = useCurrentUserStore(state => state.user.id)
  const [checked, setChecked] = useState(
    Boolean(
      users.filter(userId => userId !== currentUserId).length +
        permissionGroups.length
    )
  )
  // const [navigation, setNavigation] = useState<Navigation>({
  //   // users: {
  //   //   endCursor: null,
  //   //   hasNext: true,
  //   // },
  //   groups: {
  //     endCursor: null,
  //     hasNext: true,
  //   },
  // })
  // const [fetchedStaff, refetchStaffUsers] = useQueryStaffUsers(
  //   { first: 100, after: navigation.users.endCursor },
  //   { pause: true }
  // )
  // const [fetchedGroups, refetchedGroups] = useQueryPermissionGroups(
  //   { first: 100, after: navigation.groups.endCursor },
  //   { pause: true }
  // )
  const [isOpen, setIsOpen] = useState(false)
  const [staff, setStaff] = useState<CheckboxListOption[]>([])
  // const [staffCopy, setStaffCopy] = useState<CheckboxListOption[]>([])
  const [groups, setGroups] = useState<CheckboxListOption[]>([])
  // const [groupsCopy, setGroupsCopy] = useState<CheckboxListOption[]>([])
  // const [search, setSearch] = useState('')
  const [tab, setTab] = useState<TabPage>(TabPage.USER)

  const onSave = () => {
    setIsOpen(false)
    //setStaff(staffCopy)
    // setUsers([
    //   currentUserId,
    //   ...staffCopy
    //     .filter(staffUser => staffUser.checked === true)
    //     .map(staffUser => staffUser.id),
    // ])
    // setGroups(groupsCopy)
    // setPermissionGroups([
    //   ...groupsCopy
    //     .filter(group => group.checked === true)
    //     .map(group => group.id),
    // ])
  }

  const onCancel = () => {
    setIsOpen(false)
    // setStaffCopy(staff)
    // setGroupsCopy(groups)
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
      setPermissionGroups([
        ...groups
          .filter(group => group.checked === true)
          .map(group => group.id),
      ])
    } else {
      setUsers([currentUserId])
      setPermissionGroups([])
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
    setGroups(
      produce(draft => {
        const group = draft.find(group => group.id === id)
        if (group) group.checked = false
      })
    )
    setPermissionGroups(permissionGroups.filter(groupId => groupId !== id))
  }

  const onTabChange = (value: string) => {
    setTab(value as TabPage)
    // setSearch('')
  }

  // useEffect(() => {
  //   if (fetchedStaff.data) {
  //     const { edges, pageInfo } = fetchedStaff.data.staffUsers
  //     setStaff([
  //       ...staff,
  //       ...edges
  //         .map(({ node }) => ({
  //           id: node.id,
  //           name: node.firstName
  //             ? `${node.firstName} ${node.lastName}`
  //             : node.email,
  //           value: node.id,
  //           checked: users.includes(node.id),
  //         }))
  //         .filter(option => option.id !== currentUserId),
  //     ])

  //     setNavigation(
  //       produce(draft => {
  //         draft.users.endCursor = pageInfo.endCursor
  //         draft.users.hasNext = pageInfo.hasNextPage
  //       })
  //     )
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [fetchedStaff.data])

  // useEffect(() => {
  //   if (fetchedGroups.data) {
  //     const { edges, pageInfo } = fetchedGroups.data.permissionGroups
  //     setGroups([
  //       ...groups,
  //       ...edges.map(({ node }) => ({
  //         id: node.id,
  //         name: node.name,
  //         value: node.id,
  //         checked: permissionGroups.includes(node.id),
  //       })),
  //     ])

  //     setNavigation(
  //       produce(draft => {
  //         draft.groups.endCursor = pageInfo.endCursor
  //         draft.groups.hasNext = pageInfo.hasNextPage
  //       })
  //     )
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [fetchedGroups.data])

  // useEffect(() => {
  //   // if (navigation.users.hasNext) {
  //   //   refetchStaffUsers()
  //   // }

  //   if (navigation.groups.hasNext) {
  //     refetchedGroups()
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [navigation])

  // useEffect(() => {
  //   setStaffCopy(staff)
  // }, [staff])

  // useEffect(() => {
  //   setGroupsCopy(groups)
  // }, [groups])

  // if (
  //   // fetchedStaff.fetching ||
  //   // navigation.users.hasNext ||
  //   fetchedGroups.fetching ||
  //   navigation.groups.hasNext
  // ) {
  //   return <div>Loading...</div>
  // }

  const fullSelectedRecipients = [...staff, ...groups].filter(
    recipient => recipient.checked
  )

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
            {fullSelectedRecipients.slice(0, 5).map(recipient => (
              <Chip
                className={classes.recipient}
                deleteIcon={<CloseIcon />}
                variant="default"
                label={recipient.name}
                key={recipient.id}
                onDelete={() => onDelete(recipient.id)}
              />
            ))}
            {fullSelectedRecipients.length - 5 > 0 && (
              <Chip
                className={classes.recipient}
                variant="default"
                label={`${fullSelectedRecipients.length - 5} more...`}
                onClick={() => setIsOpen(true)}
              />
            )}
            <IconButton onClick={() => setIsOpen(true)} size="small">
              <AddIcon />
            </IconButton>
          </Box>
          <SurfaceModal isOpen={isOpen} onClose={onCancel} onSave={onSave}>
            <Tabs
              indicatorColor="primary"
              className={classes.tabs}
              variant="fullWidth"
              value={tab}
              onChange={(_, value) => onTabChange(value)}
            >
              <Tab value={TabPage.USER} fullWidth label="Users" />
              <Tab value={TabPage.GROUP} fullWidth label="Groups" />
            </Tabs>
            <Typography variant="h5">
              Select {tab === TabPage.USER ? 'Recipients' : 'Groups'}
            </Typography>
            {/* <Box margin="1.2rem 0">
              <SearchInput
                onChange={event => setSearch(event.target.value)}
                value={search}
              />
            </Box> */}
            {tab === TabPage.USER ? (
              // <CheckboxList
              //   options={staffCopy}
              //   mainCheckboxTitle="Select all recipients"
              //   subCheckboxTitle="Send the report to all recipients"
              //   setOptions={setStaffCopy}
              //   filter={option => option.name.includes(search)}
              // />
              <RecipientsList />
            ) : (
              <PermissionGroupsList />
              // <CheckboxList
              //   options={groupsCopy}
              //   mainCheckboxTitle="Select all groups"
              //   subCheckboxTitle="Send the report to all groups"
              //   setOptions={setGroupsCopy}
              //   filter={option => option.name.includes(search)}
              // />
            )}
          </SurfaceModal>
        </>
      )}
    </Box>
  )
}

export default Recipients
