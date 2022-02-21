import { makeStyles } from '@saleor/macaw-ui'

export const useStyles = makeStyles(theme => ({
  selectBox: {
    '& > *': {
      marginBottom: theme.spacing(1.5),
    },
    '& > *:last-child': {
      marginBottom: '0',
    },
  },
  paddingBox: {
    padding: theme.spacing(3),
  },
  bottomHr: {
    borderBottom: '1px solid #EFF5F8',
  },
}))

export default useStyles
