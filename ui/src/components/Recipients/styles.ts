import { makeStyles } from '@saleor/macaw-ui'

export const useStyles = makeStyles(theme => ({
  recipientsBox: {
    border: 'solid 1px rgba(40, 35, 74, 0.4)',
    borderRadius: '4px',
    padding: theme.spacing(1),
  },
  boxTitle: {
    fontSize: theme.spacing(1.4),
    color: theme.palette.primary.light,
    marginBottom: theme.spacing(1),
  },
}))

export default useStyles
