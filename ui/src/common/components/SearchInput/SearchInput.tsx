import React from 'react'
import { TextField, TextFieldProps, InputAdornment } from '@material-ui/core'
import clsx from 'clsx'
import { Search as SearchIcon } from '@material-ui/icons'

import useStyles from './styles'

export const SearchInput = React.forwardRef<HTMLDivElement, TextFieldProps>(
  (props, ref) => {
    const classes = useStyles()

    return (
      <TextField
        ref={ref}
        {...props}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        fullWidth
        // eslint-disable-next-line react/prop-types
        className={clsx(classes.root, props.className)}
        placeholder="search..."
      />
    )
  }
)

SearchInput.displayName = 'SearchInput'

export default SearchInput
