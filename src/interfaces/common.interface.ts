export enum FieldTypes {
  DROPDOWN = "dropdown",
  TEXTFIELD = "text",
  PASSWORD = "password",
  EMAIL = "email",
  CHECKBOX = "checkbox",
  RADIO_BTN = "radio",
  DATE_PICKER = "date",
  NUMBER_FORMAT = "number_format",
  NUMBER_WITH_FORMAT = "number_with_format",
  MULTISELECT = "multiselect",
}

export interface FormFieldsAttributes {
  label: string
  name: string
  type: FieldTypes
  placeholder?: string
  options?: Array<string> | ((data: any) => Promise<any>) | any
  validation?: any
  prefix?: any
  startAdornment?: boolean
  endAbdornment?: boolean
  postfix?: any
  numberFormat?: boolean
  format?: string
  defaultValue?: any,
  mask?: string,
  multiple?: boolean,
  selectType?: string  
}