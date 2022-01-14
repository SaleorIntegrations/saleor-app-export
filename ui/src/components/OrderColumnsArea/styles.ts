import { makeStyles } from '@saleor/macaw-ui'

export const useStyles = makeStyles(theme => ({
  selectBox: {
    '& > *': {
      marginBottom: theme.spacing(1.5)
    },
    '& > *:last-child': {
      marginBottom: '0'
    }
  },
}))

export default useStyles
