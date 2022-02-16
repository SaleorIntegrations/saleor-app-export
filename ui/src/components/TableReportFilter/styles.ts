import { makeStyles } from '@saleor/macaw-ui'

export const useStyles = makeStyles(theme => ({
  searchBar: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
    padding: theme.spacing(0, 4),
    borderBottom: '1px solid #EFF5F8',
    height: '80px',
  },
}))

export default useStyles
