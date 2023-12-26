// import CustomTextField from "src/components/CustomFilterInput/CustomTextField"
import { FieldTypes, FormFieldsAttributes } from "./interfaces/common.interface"
import * as yup from "yup"


export const FormFields = (): FormFieldsAttributes[] => [

  {
    label: "email",
    name: "email",
    type: FieldTypes.EMAIL,
    placeholder: "enter email",
    validation: yup.string().email().required(),
  },
  {
    label: "First Name",
    name: "first_name",
    type: FieldTypes.TEXTFIELD,
    placeholder: "enter first name",
    validation: yup.string().required(),
  },
  {
    label: "Last Name",
    name: "last_name",
    type: FieldTypes.TEXTFIELD,
    placeholder: "enter last name",
    validation: yup.string().required(),
  },
]

// Mandatory to use it with Form, it is auto generated validation
export const FormValidationRules = (flag: 'column' | 'form') => {
  const defaultRule = yup.string()
  const Rules:any = {}
  if (flag === "form") FormFields().forEach((field:any) => (Rules[field.name] = field.validation || defaultRule))
  return yup.object(Rules)
}
