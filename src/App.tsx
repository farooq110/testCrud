import { SideNav } from "./components/SideBar";
import { useContext, useMemo, useState } from "react";
import { TopNav } from "./components/Header";
import Table from "./components/Table";
import { MRT_ColumnDef, useMaterialReactTable } from "material-react-table";
import { Grid } from "@mui/material";
import { Action, CustomModalContext } from "./contexts/CustomModalContext";
import CustomModal from "./components/CustomModal";
import AddForm from "./components/AddForm";

import { useDispatch, useSelector } from "react-redux";
import { removeUser, selectUsers } from "./redux/slice/userSlice";
import Alert from "./components/Alert";
import { User, columnDefination, tableConfig } from "./columns";

function App() {
  const { modalData, openModal } = useContext(CustomModalContext);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const data = useSelector(selectUsers);
  const dispatch = useDispatch();
  const [openNav, setOpenNav] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const columns = useMemo<MRT_ColumnDef<User>[]>(() => columnDefination, []);

  const handleEditeAction = (userData: any) => {
    openModal({
      componenet: AddForm,
      open: true,
      headerTitle: "Add New Customer",
      action: Action.UPDATE,
      formData: userData,
    });
  };

  const handleDeleteAction = (id: string) => {
    handleOpenDeleteDialog();
    setDeleteId(id);
  };

  const handleCreateAction = () => {
    openModal({
      componenet: AddForm,
      open: true,
      headerTitle: "Add New Customer",
      action: Action.CREATE,
    });
  };

  const handleOpenDeleteDialog = () => {
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  const handleDelete = () => {
    if (!deleteId) alert("please select user to delete");
    dispatch(removeUser(deleteId));
    handleCloseDeleteDialog();
  };

  const table = useMaterialReactTable(
    tableConfig(
      columns,
      data,
      handleEditeAction,
      handleDeleteAction,
      handleCreateAction
    )
  );
  return (
    <>
      <Alert
        open={isDeleteDialogOpen}
        handleClose={handleCloseDeleteDialog}
        handleDelete={handleDelete}
      />
      <CustomModal show={modalData.open} />
      <Grid item container xs={12}>
        <Grid item xs={2} sx={{ display: { lg: "block", xs: "none" } }}>
          <SideNav onClose={() => setOpenNav(false)} open={openNav} />
        </Grid>
        <Grid item xs={12} lg={10}>
          <Grid sm={12} item container sx={{ backgroundColor: "#F3F3F3" }}>
            <Grid item sm={12} sx={{ width: "100%" }}>
              <TopNav onNavOpen={() => setOpenNav(true)} />
            </Grid>
            <Grid
              item
              sm={12}
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "5rem",
                width: "100%",
              }}
            >
              <Table tableData={table} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default App;
