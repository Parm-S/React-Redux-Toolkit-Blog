
import { SxProps } from "@mui/system/styleFunctionSx";

const textFieldStyles: SxProps = {
  [`& fieldset`]: {
    borderRadius: 2,
  },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "success.main",
  },
  "& label.Mui-focused": {
    color: "success.main",
  },
};

const invalidTextFieldStyles: SxProps = {
  [`& fieldset`]: {
    borderRadius: 2,
  },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "red",
  },
  "& label.Mui-focused": {
    color: "red",
  },
  "& .MuiInputLabel-root.Mui-error": {
    color: "red",
  },
  "& .Mui-error .MuiOutlinedInput-notchedOutline": {
    borderColor: "red!important",
  },
  "& .MuiFormHelperText-root.Mui-error ": {
    color: "red",
  },
};

export { textFieldStyles, invalidTextFieldStyles };