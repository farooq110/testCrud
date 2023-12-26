import { InputAdornment, TextField } from "@mui/material";
import React, { memo } from "react";
import { Controller } from "react-hook-form";
import {
  FormFieldsAttributes,
  FieldTypes,
} from "../../interfaces/common.interface";

interface CustomFormElementsProps {
  errors: any;
  register: any;
  control: any;
  item: FormFieldsAttributes;
  setValue?: (name: any, value: any) => void;
  getValues?: (name: any) => any;
  onPressIcon?: () => void;
  onChangeText?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  columnDef?: any;
  variant?: "standard" | "outlined" | "filled";
  value?: any;
}
function CustomFormElements(props: CustomFormElementsProps) {
  const { value, item, control, onPressIcon, variant = "outlined" } = props;

  if (!item) return null;

  const { name, label, placeholder, type } = item;

  const getInputProps = () => {
    const inputProps: any = {};
    if (item.startAdornment) {
      inputProps["startAdornment"] = (
        <InputAdornment position="start">{item.prefix}</InputAdornment>
      );
    }
    if (item.endAbdornment) {
      inputProps["endAdornment"] = (
        <InputAdornment onClick={onPressIcon} position="end">
          {item.postfix}
        </InputAdornment>
      );
    }
    return inputProps;
  };

  const getTextField = () => {
    return (
      <Controller
        name={name}
        control={control}
        defaultValue={value || ""}
        render={({ field, fieldState }) => {
          return (
            <TextField
              variant={variant}
              fullWidth
              label={label}
              placeholder={placeholder}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              InputProps={{ ...getInputProps(), sx: { borderRadius: "10px" } }}
              type={type}
              {...field}
            />
          );
        }}
      />
    );
  };

  const displayForm = () => {
    if (type === FieldTypes.TEXTFIELD) return getTextField();
    else return "no component";
  };

  return <React.Fragment>{displayForm()}</React.Fragment>;
}

export default memo(CustomFormElements);
