import { makeStyles } from '@saleor/macaw-ui'

export const useStyles = makeStyles(theme => ({
  paper: {
    maxHeight: '100%',
    height: '100%',
    overflow: 'scroll',
    display: 'flex',
    flexDirection: 'column',
  },
}))

export default useStyles
