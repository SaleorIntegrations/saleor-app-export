import { makeStyles } from '@saleor/macaw-ui'

export const useStyles = makeStyles(() => ({
  row: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
  tableHead: {
    position: 'relative',
    '& th': {
      background: 'transparent',
    },
  },
  hiddenCell: {
    visibility: 'hidden',
  },
  selectedText: {
    position: 'absolute',
    zIndex: 10,
    left: '70px',
    top: 0,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
  },
}))

export default useStyles
