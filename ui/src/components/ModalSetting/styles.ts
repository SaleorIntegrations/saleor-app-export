import { makeStyles } from '@saleor/macaw-ui'

export const useStyles = makeStyles(theme => ({
  modal: {
    width: '632px',
    padding: theme.spacing(3, 4),
    maxHeight: '-webkit-fill-available',
    overflow: 'scroll',
  },
  checkSlot: {
    width: '100%',
    paddingTop: theme.spacing(1),
    borderBottom: '1px solid #EFF5F8',
  },
  buttonBox: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: theme.spacing(2),
    '& > *': {
      marginLeft: theme.spacing(1),
    },
  },
}))

export default useStyles
