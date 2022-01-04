import React, { useState } from 'react'
import { Typography, Box } from '@material-ui/core'
import clsx from 'clsx'

import { ModalSelect } from '../ModalSelect'
import {
  ChannelSettingModal,
  FieldSettingModal,
  AttributeSettingModal,
} from '../ModalSetting'
import Surface from '../Surface'
import Label from '../Label'
import useStyles from './styles'

export function InformationArea() {
  const [channels, setChannels] = useState<string[]>([])
  const [fields, setFields] = useState<string[]>([])
  const [attributes, setAttributes] = useState<string[]>([])
  const classes = useStyles()

  return (
    <Surface padding={0}>
      <Box className={clsx(classes.paddingBox, classes.bottomHr)}>
        <Box paddingBottom={2}>
          <Typography variant="h5">Information</Typography>
          <Typography>
            Select information you want to export from options below.
          </Typography>
        </Box>
        <Box className={classes.selectBox}>
          <ModalSelect
            title="Channels"
            description={
              channels.length ? `selected ${channels.length}` : undefined
            }
            render={setIsOpen => (
              <ChannelSettingModal
                channels={channels}
                setChannels={setChannels}
                setIsOpen={setIsOpen}
              />
            )}
          />
          <ModalSelect
            title="Product organsation"
            description={
              fields.length ? `selected ${fields.length}` : undefined
            }
            render={setIsOpen => (
              <FieldSettingModal
                fields={fields}
                setFields={setFields}
                setIsOpen={setIsOpen}
              />
            )}
          />
          <ModalSelect
            title="Attributes"
            description={
              attributes.length ? `selected ${attributes.length}` : undefined
            }
            render={setIsOpen => (
              <AttributeSettingModal
                attributes={attributes}
                setAttributes={setAttributes}
                setIsOpen={setIsOpen}
              />
            )}
          />
        </Box>
      </Box>
      <Box className={classes.paddingBox}>
        <Label>EXPORTED DATA</Label>
        <Typography>You will be exporting 260 products</Typography>
      </Box>
    </Surface>
  )
}

export default InformationArea
