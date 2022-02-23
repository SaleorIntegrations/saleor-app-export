import { makeStyles } from '@saleor/macaw-ui'

export const useStyles = makeStyles(theme => ({
  tabs: {
    borderBottom: '1px solid #EFF5F8',
    padding: theme.spacing(0, 4),
  },
  icon: {
    position: 'absolute',
    right: '2px',
    top: 0,
    bottom: 0,
    marginTop: 'auto',
    marginBottom: 'auto',
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
}))

export default useStyles
