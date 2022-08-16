import React, { Children } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'

import { textFieldStyles } from '../input/style'

interface ISelectProps {
  name: string
  label: string
  defaultValue: string
  children: React.ReactNode
}

const Select: React.FC<ISelectProps> = ({ name, label, defaultValue, children }) => {
  console.log(label)
  const { control, getValues } = useFormContext()
  return (
    <Controller
      render={({ field }) => (
        <TextField
          select={true}
          label={label}
          fullWidth={true}
          sx={textFieldStyles}
          defaultValue={defaultValue}
          onChange={field.onChange}
          value={field.value}
          inputRef={field.ref}
          name={field.name}
        >
          {children}
        </TextField>
      )}
      defaultValue=""
      name={name}
      control={control}
    />
  )
}

export default Select
