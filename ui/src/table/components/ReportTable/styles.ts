import { makeStyles } from '@saleor/macaw-ui'

export const useStyles = makeStyles(theme => ({
  row: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
  tableHead: {
    position: 'relative',
    '& th': {
      background: theme.palette.background.paper,
    },
  },
  hiddenCell: {
    visibility: 'hidden',
  },
  selectedText: {
    position: 'fixed',
    zIndex: 10,
    left: '70px',
    top: 0,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  container: {
    overflow: 'auto',
    height: 'calc(100% - 52px)',
  },
}))

export default useStyles
