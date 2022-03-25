import { makeStyles } from '@saleor/macaw-ui'

export const useStyles = makeStyles(theme => ({
  platform: {
    padding: theme.spacing(4),
    width: '640px',
    boxSizing: 'border-box',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'flex-end',
    '& > button': {
      marginLeft: theme.spacing(1),
    },
  },
  body: {
    maxHeight: '70vh',
    overflow: 'auto',
    padding: '1em',
  },
}))

export default useStyles
