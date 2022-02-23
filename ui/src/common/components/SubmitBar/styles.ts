import { makeStyles } from '@saleor/macaw-ui'

export const useStyles = makeStyles(() => ({
  root: {
    padding: '1.6rem 2.4rem 1.6rem 2.4rem',
    boxSizing: 'border-box',
    borderRadius: '6px 6px 0 0',
    textAlign: 'right',
    '& > *': {
      marginLeft: '1.2rem',
    },
  },
}))

export default useStyles
