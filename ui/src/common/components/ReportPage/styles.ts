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
  content: {
    flex: '1 1 auto',
    margin: '1em 0',
    paddingBottom: '80px',
  },
}))

export default useStyles
