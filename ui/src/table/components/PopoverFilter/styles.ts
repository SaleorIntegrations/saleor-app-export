import { makeStyles } from '@saleor/macaw-ui'

export const useStyles = makeStyles(theme => ({
  popover: {
    zIndex: theme.zIndex.modal,
  },
}))

export default useStyles
