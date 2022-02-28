import { makeStyles } from '@saleor/macaw-ui'

export const useStyles = makeStyles(theme => ({
  search: {
    '& input': {
      padding: theme.spacing(1.2, 1),
    },
  },
}))

export default useStyles
