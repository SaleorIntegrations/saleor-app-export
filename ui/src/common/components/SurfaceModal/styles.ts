import { makeStyles } from '@saleor/macaw-ui'

export const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(4),
  },
  surface: {
    width: '632px',
    overflow: 'auto',
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
