import { makeStyles } from '@saleor/macaw-ui'

export const useStyles = makeStyles(theme => ({
  zoneToggle: {
    borderRadius: '4px !important',
    width: '100% !important',
    border: 'none !important',
    padding: '2px 0 !important',
  },
  zoneForm: {
    width: '100%',
    padding: theme.spacing(0.5),
    borderRadius: '4px',
    border: '1px solid #EFF5F8',
  },
}))

export default useStyles
