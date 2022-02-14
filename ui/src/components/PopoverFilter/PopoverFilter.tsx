import React, { useRef, useState } from 'react'
import { Button, Popper } from '@material-ui/core'

import { useStyles } from './styles'

type SetIsOpen = (isOpen: boolean) => void

type SetChildren = (setIsOpen: SetIsOpen) => React.ReactNode

interface PopoverFilterProps {
  render: React.ReactNode | SetChildren
}

export function PopoverFilter(props: PopoverFilterProps) {
  const classes = useStyles()
  const { render } = props
  const anchor = useRef(null)
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button
        variant="text"
        color="primary"
        ref={anchor}
        onClick={() => setIsOpen(!isOpen)}
      >
        Filter
      </Button>
      <Popper
        open={isOpen}
        className={classes.popover}
        placement="bottom-start"
        anchorEl={anchor.current}
      >
        {typeof render === 'function' ? render(setIsOpen) : render}
      </Popper>
    </>
  )
}

export default PopoverFilter
