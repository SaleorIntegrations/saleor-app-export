import { makeStyles } from '@saleor/macaw-ui'

export const useStyles = makeStyles(theme => ({
  time: {
    marginLeft: theme.spacing(1),
    width: '40%',
  },
  date: {
    width: '60%',
  },
  dateBox: {
    display: 'flex',
    margin: theme.spacing(1, 0),
  },
}))

export default useStyles
