import React from "react";
import TextField from "@mui/material/TextField";

import { Controller, useFormContext } from "react-hook-form";

import isValidPattern from "../../utils/patternValidation";
import { invalidTextFieldStyles, textFieldStyles } from "./style";


interface FormInputProps {
  name: string;
  label?: string;
  pattern?: RegExp;
  rows?: number;
  multiline?: boolean;
  required?: boolean;
  helperText?: string;
  type?: string;
  select?: boolean;
  value?: string | number;
  onChange?: unknown;
  readOnly?: boolean;
  placeholder?: string;
  maxLength?: number;
  minLength?: number;
  children?: React.ReactNode
}

const Input: React.FC<FormInputProps> = ({
  name,
  label,
  pattern,
  rows = 1,
  multiline = false,
  required = false,
  select = false,
  helperText,
  type,
  placeholder,
  value,
  children,
  minLength,
  maxLength = 0,
  readOnly = false,
}) => {
  const { control, getValues} = useFormContext();

  return (
    <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field, fieldState }) => (
          <TextField
            select={select}
            fullWidth={true}
            sx={
              fieldState.error || field.value.length > maxLength
                ? invalidTextFieldStyles
                : textFieldStyles
            }
            placeholder={placeholder}
            required={required}
            name={field.name}
            type={type}
            margin="dense"
            label={label}
            value={field.value}
            onChange={field.onChange}
            inputRef={field.ref}
            rows={rows}
            multiline={multiline}
            error={
              fieldState.error || field.value.length > maxLength ? true : false
            }
            helperText={
              fieldState.error?.type === "validate"
                ? `${helperText}`
                : `Minimum ${minLength} & Maximum ${maxLength} characters (${
                    maxLength - field.value.length
                  } characters left)`
            }
            InputProps={{
              readOnly: readOnly,
            }}
            inputProps={{
              minLength: minLength,
            }}
          >
            {children || value}
          </TextField>
        )}
        rules={{
          required: required,
          validate: () => {
            const values = getValues(name);
            if (pattern) {
              if (isValidPattern(pattern, values)) {
                return true;
              } else {
                return false;
              }
            }
            return true;
          },
          maxLength: maxLength,
          minLength: minLength,
        }}
      />
  );
};

export default Input;