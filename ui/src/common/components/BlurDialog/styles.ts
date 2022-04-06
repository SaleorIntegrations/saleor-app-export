import { makeStyles } from '@saleor/macaw-ui'

export const useStyles = makeStyles(theme => ({
  dialog: {
    overflow: 'auto',
    '& > div:first-child': {
      opacity: '0.8 !important',
      backgroundColor: `${theme.palette.background.default} !important`,
      backdropFilter: 'blur(2px)',
    },
  },
}))

export default useStyles
