import { makeStyles } from '@saleor/macaw-ui'

export const useStyles = makeStyles(theme => ({
  filterSeparator: {
    display: 'inline',
    height: '2.2rem',
    width: '1px',
    backgroundColor: theme.palette.primary.main,
    margin: theme.spacing(0, 1),
  },
  filterBox: {
    width: '100%',
    display: 'flex',
    height: 'min-content',
    justifyContent: 'space-around',
    columnGap: '10px',
    padding: theme.spacing(1, 4),
    borderBottom: '1px solid #EAEAEA',
  },
  filterHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(1, 3),
    columnGap: theme.spacing(1),
    borderBottom: '1px solid #EAEAEA',
    '& > p': {
      flexGrow: 1,
    },
  },
  filterContentHeader: {
    fontWeight: 600,
  },
  search: {
    flexGrow: 1,
    '& .MuiOutlinedInput-input': {
      padding: '9px 12px',
    },
  },
  filterPopover: {
    width: '400px',
  },
}))

export default useStyles
