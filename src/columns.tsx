import { MRT_ColumnDef } from "material-react-table";
import {
  FieldTypes,
  FormFieldsAttributes,
} from "./interfaces/common.interface";
import * as yup from "yup";
import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
};

export const columnDefination: MRT_ColumnDef<User>[] = [
  {
    accessorKey: "avatar",
    header: "",
    enableEditing: false,
    enableColumnActions: false,
    enableColumnFilter: false,
    enableSorting: false,
    size: 100,
    Cell: ({ cell }) => {
      return (
        <img
          src={`${cell.row.original.avatar}`}
          alt={`Image`}
          loading="lazy"
          style={{ borderRadius: "8px", width: "6rem", height: "6rem" }}
        />
      );
    },
  },
  {
    accessorKey: "id",
    header: "Customer ID",
    enableEditing: false,
    size: 50,
  },
  {
    accessorKey: "first_name",
    header: "Customer Name",
    size: 100,
    Cell: ({ cell }) => {
      return `${cell.row.original.first_name} ${cell.row.original.last_name}`;
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    size: 100,
  },
];

export const tableConfig: any = (
  columns: any,
  data: any,
  handleEditeAction: any,
  handleDeleteAction: any,
  handleCreateAction: any
) => ({
  // enableColumnFilters: false,
  enableColumnActions: false,
  columnFilterDisplayMode: "popover",
  columns,
  layoutMode: "grid",
  data,
  muiTableBodyRowProps: {
    sx: {
      backgroundColor: "white",
      marginBlock: "1rem",
    },
  },
  muiTableBodyProps: {
    sx: { backgroundColor: "#F3F3F3" },
  },
  muiTablePaperProps: {
    sx: {
      width: "90%",
      boxShadow: "none",
      ".MuiBox-root": {},
    },
  },
  enableRowActions: true,
  positionActionsColumn: "last",
  renderRowActions: ({ row }: any) => (
    <Box
      sx={{
        display: "flex",
        flexWrap: "nowrap",
        gap: "0.5rem",
      }}
    >
      <Button
        sx={{
          color: "#008212",
          backgroundColor: "#39B54a",
          ":hover": { backgroundColor: "#39B54a" },
        }}
        onClick={() => handleEditeAction(row.original)}
        variant="contained"
      >
        Edit
      </Button>
      <Button
        sx={{
          color: "#D80000",
          backgroundColor: "#ff5765",
          ":hover": { backgroundColor: "#ff5765" },
        }}
        onClick={() => handleDeleteAction(row.original.id)}
        variant="contained"
      >
        Delete
      </Button>
    </Box>
  ),
  renderTopToolbarCustomActions: () => {
    return (
      <Button
        component="label"
        onClick={handleCreateAction}
        sx={{ background: "linear-gradient(105deg, #57BC90 0%, #004B40 100%)" }}
        variant="contained"
        startIcon={<AddIcon />}
      >
        ADD NEW CUSTOMER
      </Button>
    );
  },
  muiTableHeadRowProps: {
    sx: {
      backgroundColor: "#57BC90",
      marginBlock: "1rem",
    },
  },
  muiTableProps: {
    sx: { backgroundColor: "#F3F3F3" },
  },
  createDisplayMode: "modal",
});

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
];

export const FormValidationRules = (flag: "column" | "form") => {
  const defaultRule = yup.string();
  const Rules: any = {};
  if (flag === "form")
    FormFields().forEach(
      (field: any) => (Rules[field.name] = field.validation || defaultRule)
    );
  return yup.object(Rules);
};
