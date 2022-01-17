import { makeStyles } from '@saleor/macaw-ui'

export const useStyles = makeStyles(theme => ({
  header: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: theme.spacing(3),
  },
}))

export default useStyles
