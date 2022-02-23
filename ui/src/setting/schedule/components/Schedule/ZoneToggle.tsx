import { withStyles } from '@material-ui/core'
import { ToggleButton } from '@material-ui/lab'

export const ZoneToggle = withStyles(theme => ({
  selected: {
    backgroundColor: `${theme.palette.primary.light} !important`,
    color: '#FFFFFF !important',
  },
}))(ToggleButton)

export default ZoneToggle
