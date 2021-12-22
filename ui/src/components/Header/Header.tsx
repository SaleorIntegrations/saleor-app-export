import React from 'react'
import { Paper, IconButton, Box, Avatar, Typography } from '@material-ui/core'
import { CloseRounded } from '@material-ui/icons'
import { makeStyles } from '@saleor/macaw-ui'

import SaleorAvatar from '../../assets/images/avatars/saleor.svg'

const useStyles = makeStyles(theme => ({
  root: {
    padding: '1.6rem 2.4rem 1.6rem 2.4rem',
    boxSizing: 'border-box',
    borderRadius: '0 0 6px 6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    marginRight: theme.spacing(1),
  },
  avatarBox: {
    display: 'flex',
    alignItems: 'center',
  },
}))

export function Header() {
  const classes = useStyles()

  return (
    <Paper className={classes.root}>
      <Box className={classes.avatarBox}>
        <Avatar src={SaleorAvatar} className={classes.avatar} />
        <Box>
          <Typography variant="h6">Saleor Reports</Typography>
          <Typography variant="caption">BY SALEOR COMMERCE</Typography>
        </Box>
      </Box>
      <IconButton aria-label="close-button">
        <CloseRounded />
      </IconButton>
    </Paper>
  )
}

export default Header
