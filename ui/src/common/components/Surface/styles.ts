import { makeStyles } from '@saleor/macaw-ui'

export const useStyles = (padding: number) =>
  makeStyles(theme => ({
    root: {
      padding: theme.spacing(padding),
    },
  }))()

export default useStyles
