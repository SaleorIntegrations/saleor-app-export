import { makeStyles } from '@saleor/macaw-ui'

export const useStyles = makeStyles((theme) => ({
  summary: {
    padding: '0',
    display: 'flex',
    justifyContent: 'space-between',
    '& .MuiAccordionSummary-content': {
      margin: '0',
      padding: theme.spacing(1, 2),
      flexGrow: '0'
    },
    '& .MuiAccordionSummary-expandIcon': {
      marginRight: theme.spacing(1),
      padding: '2px'
    },
  },
  accordion: {
    '&.Mui-expanded': {
      margin: '0px'
    },
    '&::before': {
      opacity: '0',
    },
    boxShadow: 'none',
  },
  searchInput: {
    width: '100%',
    marginBottom: theme.spacing(1),
    '& input[type="text"]': {
      padding: '12px 0 9px 12px'
    }
  },
  details: {
    padding: theme.spacing(2, 3),
    backgroundColor: 'rgba(6, 132, 123, 0.1)',
    display: 'block',
  },
  checkOption: {
    display: 'block'
  },
  linkButton: {
    '&.MuiLink-underlineHover:hover': {
      cursor: 'pointer'
    }
  },
  search: {
    flexGrow: 1,
    '& .MuiOutlinedInput-input': {
      padding: '9px 12px'
    }
  }
}))

export default useStyles
