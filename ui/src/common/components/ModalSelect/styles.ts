import { makeStyles } from '@saleor/macaw-ui'

export const useStyles = makeStyles(theme => ({
  editButton: {
    width: '100%',
    height: '70px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(1, 3),
    '&:hover': {
      cursor: 'pointer',
    },
  },
  typography: {
    textAlign: 'left',
  },
  modal: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(4),
    '& > div:first-child': {
      opacity: '0.8',
      backgroundColor: `${theme.palette.background.default} !important`,
      backdropFilter: 'blur(2px)',
    },
  },
}))

export default useStyles
