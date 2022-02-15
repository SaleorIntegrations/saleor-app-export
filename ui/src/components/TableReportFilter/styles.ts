import { makeStyles } from '@saleor/macaw-ui'

export const useStyles = makeStyles(theme => ({
  searchBar: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
    padding: theme.spacing(2, 4),
    borderBottom: '1px solid #EFF5F8',
  },
  search: {
    '& input': {
      padding: theme.spacing(1.2, 1),
    },
  },
}))

export default useStyles
