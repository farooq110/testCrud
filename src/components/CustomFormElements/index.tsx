import { Box, Chip, FormControl, FormHelperText, InputAdornment, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import React, { memo, forwardRef, useMemo, useEffect, useState } from "react"
import { Controller } from "react-hook-form"
import { FormFieldsAttributes, FieldTypes } from "../../interfaces/common.interface"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
// import AdapterDateFns from "@mui/lab/AdapterDateFns"
// import { NumericFormat, PatternFormat } from "react-number-format"
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from "@mui/material/Button"
import CircularProgress from "@mui/material/CircularProgress"

interface CustomFormElementsProps {
  errors: any
  register: any
  control: any
  item: FormFieldsAttributes
  setValue?: (name: any, value: any) => void
  getValues?: (name: any) => any
  onPressIcon?: () => void
  onChangeText?: (e: React.ChangeEvent<HTMLInputElement>) => void,
  columnDef?: any,
  variant?: 'standard' | 'outlined' | 'filled',
  value?: any,
}
function CustomFormElements(props: CustomFormElementsProps) {
  const { value,
    // errors,
    // register, getValues, columnDef, 
    item, control, onPressIcon, setValue, variant = "outlined" } = props

  if (!item) return null

  const { name, label, placeholder, type, options, format, mask, multiple, selectType } = item

  const getInputProps = () => {
    const inputProps:any = {}
    if (item.startAdornment) {
      inputProps["startAdornment"] = <InputAdornment position="start">{item.prefix}</InputAdornment>
    }
    // if (item.numberFormat) {
    //   inputProps["inputComponent"] = memo(React.forwardRef((props, ref) => getNumberFormatFeild(props, ref)))
    // }
    if (item.endAbdornment) {
      inputProps["endAdornment"] = (
        <InputAdornment onClick={onPressIcon} position="end">
          {item.postfix}
        </InputAdornment>
      )
    }
    return inputProps
  }

  const getTextField = () => {
    return (
      <Controller
        name={name}
        control={control}
        defaultValue={value || ""}
        render={({ field, fieldState }) => {
          return <TextField
            variant={variant}
            fullWidth
            label={label}
            placeholder={placeholder}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            InputProps={{...getInputProps(), sx:{borderRadius:"10px"}}}
            type={type}
            {...field}
          />
        }}
      />
    )
  }

  const getSelectField = () => {
    return (
      <Controller
        name={name}
        rules={{ required: `Please select a ${label}` }}
        control={control}
        defaultValue={multiple ? value || [] : value || ""}
        render={({ field, fieldState }) => {
          const [optionsO, setOptions] = useState([])

          useEffect(() => {
            if (selectType == "remote")
              options({}).than(() => {
                setOptions([])
              })
          }, [])

          return <FormControl variant={variant} fullWidth error={fieldState.error ? true : false}>
            <InputLabel color="secondary" id={`${name}_select`}>{placeholder}</InputLabel>
            <Select
              id={`${name}_select`}
              label={label}
              multiple={multiple}
              labelId={`${name}_select`}
              error={!!fieldState.error}
              {...field}>
              {optionsO?.map((menuItem: any, index) =>
                typeof menuItem == "string" ? (
                  <MenuItem key={index} value={menuItem}>
                    {menuItem}
                  </MenuItem>
                ) : (
                  <MenuItem key={menuItem._id} value={menuItem._id}>
                    {menuItem.name}
                  </MenuItem>
                )
              )}
              <div style={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
                <Button variant="contained"
                // onClick={handleSearch} disabled={!inputValue || loading}
                >
                  {/* {loading ? <CircularProgress size={24} /> : "Search"} */}
                  "Load More"
                </Button>
              </div>
            </Select>
            {fieldState.error ? <FormHelperText error>{fieldState.error?.message}</FormHelperText> : null}

          </FormControl>
        }}
      />
    )
  }

  // const MyInput = useMemo(() => forwardRef((props: any, ref) => {
  //   const { onChange, value, fieldState, ...rest } = props;

  //   return <NumericFormat
  //     {...rest}
  //     label={label}
  //     fullWidth
  //     customInput={TextField}
  //     thousandSeparator={true}
  //     valueIsNumericString={false}
  //     prefix={item.prefix}
  //     variant={variant}
  //     placeholder={placeholder}
  //     defaultValue={value}
  //     onValueChange={(v:any) => {
  //       onChange(v.value);
  //     }}
  //     error={!!fieldState.error}
  //     helperText={fieldState.error?.message}
  //     inputRef={ref}
  //   />
  // }), []);

  // const getNumberField = () => {
  //   return (
  //     <Controller
  //       name={name}
  //       control={control}
  //       defaultValue={value}
  //       render={({ field, fieldState }) => {
  //         const { onChange, value, ...rest } = field
  //         return <>
  //           <MyInput value={value}
  //             onChange={onChange} {...rest} fieldState={fieldState} />
  //         </>
  //       }}

  //     />
  //   )
  // }

  // const MyInputWithFormat = useMemo(() => forwardRef((props: any, ref) => {
  //   const { onChange, value, fieldState, name, ...rest } = props;

  //   return <PatternFormat
  //     {...rest}
  //     name={name}
  //     label={label}
  //     fullWidth
  //     customInput={TextField}
  //     variant={variant}
  //     placeholder={placeholder}
  //     defaultValue={value}
  //     onValueChange={(v:any) => {
  //       onChange(v.value);
  //     }}
  //     format={format}
  //     mask={mask}
  //     InputProps={getInputProps()}
  //     error={!!fieldState.error}
  //     helperText={fieldState.error?.message}
  //     inputRef={ref}
  //   />
  // }), []);

  // const getNumberWithFormateField = () => {
  //   return (
  //     <Controller
  //       name={name}
  //       control={control}
  //       defaultValue={value}
  //       render={({ field, fieldState }) => {
  //         const { onChange, value, ...rest } = field
  //         return <>
  //           <MyInputWithFormat value={value}
  //             onChange={onChange} {...rest} fieldState={fieldState} />
  //         </>
  //       }}

  //     />
  //   )
  // }

  // const getDatePicker = () => {
  //   return (
  //     <Controller
  //       name={name}
  //       control={control}
  //       defaultValue={value}
  //       render={({ field, fieldState }) => (
  //         <LocalizationProvider dateAdapter={AdapterDateFns}>
  //           <DatePicker label={label}
  //             value={field.value}
  //             onChange={(newValue) => field.onChange(newValue)}
  //             renderInput={(params:any) => {
  //               useEffect(() => {
  //                 if (params?.inputProps?.value) setValue(name, params.inputProps.value)
  //               }, [])
  //               return <TextField variant={variant} value={params.value} fullWidth {...params} />
  //             }} />
  //           {fieldState.error ? <FormHelperText error>{fieldState.error?.message}</FormHelperText> : null}
  //         </LocalizationProvider>
  //       )}
  //     />
  //   )
  // }

  const getMultipleSelectField = () => {
    return (
      <Controller
        name={name}
        rules={{ required: `Please select a ${label}` }}
        control={control}
        defaultValue={value ? [value] : []}
        render={({ field, fieldState }) => (
          <FormControl variant={variant} fullWidth>
            <InputLabel id={`${name}_select`}>{placeholder}</InputLabel>
            <Select id={`${name}_select`} multiple label={label} labelId={`${name}_select`} error={!!fieldState.error} {...field}
              input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
              renderValue={
                (selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value:any) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )
              }
            >
              {/* {if(!Array.isArray(options)) return} */}
              {!Array.isArray(options) ? options?.map((menuItem: any, index:number) =>
                typeof menuItem == "string" ? (
                  <MenuItem key={index} value={menuItem}>
                    {menuItem}
                  </MenuItem>
                ) : (
                  <MenuItem key={menuItem._id} value={menuItem._id}>
                    {menuItem.name}
                  </MenuItem>
                )
              ) : null}
            </Select>
            {fieldState.error ? <FormHelperText error>{fieldState.error?.message}</FormHelperText> : null}
          </FormControl>
        )}
      />
    )
  }

  const displayForm = () => {
    if (type === FieldTypes.TEXTFIELD) return getTextField()
    else if (type === FieldTypes.DROPDOWN) return getSelectField()
    // else if (type === FieldTypes.DATE_PICKER) return getDatePicker()
    else if (type === FieldTypes.EMAIL) return getTextField()
    else if (type === FieldTypes.PASSWORD) return getTextField()
    // else if (type === FieldTypes.NUMBER_FORMAT) return getNumberField()
    else if (type === FieldTypes.MULTISELECT) return getMultipleSelectField()
    // else if (type === FieldTypes.NUMBER_WITH_FORMAT) return getNumberWithFormateField()
    else return "no component"
  }

  return <React.Fragment>{displayForm()}</React.Fragment>
}

export default memo(CustomFormElements)
