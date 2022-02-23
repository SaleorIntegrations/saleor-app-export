import { makeStyles } from '@saleor/macaw-ui'

export const useStyles = makeStyles(theme => ({
  list: {
    display: 'flex',
    flexDirection: 'column',
    '& > *': {
      marginBottom: theme.spacing(2),
      marginTop: theme.spacing(2),
    },
  },
}))

export default useStyles
