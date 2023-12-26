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

export enum AxiosMethod {
  POST = "post",
  GET = "get",
  UPDATE = "update",
  DELETE = "delete",
}

export interface RequestContext {
  method: string
  url: string
  data?: AxiosMethod
  headers?: any
}

export interface ResponseContext {
  data: any
  error: string
  ok: boolean
}

export enum eRoles {
  ADMIN = "admin",
  EMPLOYEE = "employee",
  ACCOUNTANT = "accountant",
  BDE = "business development executive",
  SUPER_ADMIN = "super admin",
  USER = "user",
}
