import React from 'react'
import { Box, Button } from '@material-ui/core'
import { FindInPage as FindInPageIcon } from '@material-ui/icons'

import { Surface } from '../../../common/components/Surface'

type SetIsOpen = (isOpen: boolean) => void

interface FilterContainerProps {
  setIsOpen: SetIsOpen
}

export function FilterContainer(props: FilterContainerProps) {
  const { setIsOpen } = props
  return (
    <Surface elevation={8}>
      <Box display="flex" justifyContent="flex-end">
        <Button
          onClick={() => setIsOpen(false)}
          variant="outlined"
          color="primary"
        >
          close
        </Button>
      </Box>
      <Box width="300px">
        <Box
          height="200px"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <FindInPageIcon />
        </Box>
      </Box>
    </Surface>
  )
}

export default FilterContainer
