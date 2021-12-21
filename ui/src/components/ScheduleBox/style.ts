import { makeStyles } from '@saleor/macaw-ui'

export const useStyles = makeStyles((theme) => ({
  zoneToggle: {
    borderRadius: '4px !important',
    width: '100% !important',
    border: 'none !important',
    padding: '2px 0 !important',
  },
  zonePaper: {
    padding: '4px'
  },
  time: {
    marginLeft: theme.spacing(1),
    width: '40%'
  },
  date: {
    width: '60%'
  },
  dateBox: {
    display: 'flex',
    margin: theme.spacing(1, 0)
  }
}))

export default useStyles
