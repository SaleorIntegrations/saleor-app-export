import { makeStyles } from '@saleor/macaw-ui'

export const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
  },
  table: {
    width: '100%',
  },
  row: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
  selected: {
    backgroundColor: 'rgba(6, 132, 123, 0.05)'
  },
  checkBox: {
    display: 'flex',
    alignItems: 'center'
  }
}))

export default useStyles
