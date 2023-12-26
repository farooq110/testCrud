import { useLocation } from 'react-router-dom';
import './App.css'
import { SideNav } from './components/SideBar'
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { TopNav } from './components/Header';
import  Table  from './components/Table';
import { MRT_ColumnDef, MRT_EditActionButtons, useMaterialReactTable } from 'material-react-table';
import { Box, Button, DialogActions, DialogContent, DialogTitle, Grid } from '@mui/material';
import { Action, CustomModalContext } from './contexts/CustomModalContext';
import CustomModal from "./components/CustomModal";
import AddForm from "./components/AddForm";
import MaskImage from "./assets/Mask.png";
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser, selectUsers } from './redux/slice/userSlice';
import Alert from "./components/Alert";

type Person = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar:string;
};

function App() {
  const { modalData, openModal } = useContext(CustomModalContext);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const data = useSelector(selectUsers);
  const dispatch = useDispatch();
  const [openNav, setOpenNav] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  const handlePathnameChange = useCallback(
    () => {
      if (openNav) {
        setOpenNav(false);
      }
    },
    [openNav]
  );

    const columns = useMemo<MRT_ColumnDef<Person>[]>(
      () => [
        {
          accessorKey: 'avatar',
          header: '',
          enableEditing: false,
          enableColumnActions: false,
          enableColumnFilter:false,
          enableSorting: false,
          enableGlobalFilterModes:true,
          size: 100,
          Cell:({cell})=>{
            return <img
            src={`${cell.row.original.avatar}`}
            alt={`Image`}
            loading="lazy"
            style={{borderRadius: "8px",
              width: "6rem",
              height: "6rem"}}
          />
          }
        },
        {
          accessorKey: 'id', //access nested data with dot notation
          header: 'Customer ID',
          enableEditing: false,
          size: 50,
        },
        {
          accessorKey: 'first_name',
          header: 'Customer Name',
          size: 100,
          Cell: ({
            cell
          }) => {
          return `${cell.row.original.first_name} ${cell.row.original.last_name}` },
        },
        {
          accessorKey: 'email', //normal accessorKey
          header: 'Email',
          size: 100,
        },
      ],
      [],
    );
   
    const table = useMaterialReactTable({
      // enableColumnFilters: false,
      enableColumnActions: false,
      columnFilterDisplayMode:"popover",
      columns,
      layoutMode:"grid",
      data, 
      muiTableBodyRowProps:{
        sx: {
          backgroundColor: 'white',
          marginBlock:"1rem",
        }
      },
      muiTableBodyProps:{
        sx:{backgroundColor:"#F3F3F3"}
      },
      muiTablePaperProps:{
        sx: {
          width: '90%',
          boxShadow:"none",
          ".MuiBox-root":{
          }
        }
      },
      enableRowActions:true,
      positionActionsColumn:"last",
      renderRowActions:({
        row
      }:any) => (<Box sx={{
        display: 'flex',
        flexWrap: 'nowrap',
        gap: '0.5rem'
      }}>
              <Button sx={{color:"#008212", backgroundColor:"#39B54a",":hover":{backgroundColor:"#39B54a"}}} onClick={
          () => openModal({ componenet: AddForm, open: true, headerTitle:"Add New Customer", action:Action.UPDATE,formData:row.original })
        } variant="contained">
                Edit
              </Button>
              <Button sx={{color:"#D80000",backgroundColor:"#ff5765", ":hover":{backgroundColor:"#ff5765"}}} onClick={() => {
          console.info('Remove', row);
          handleOpenDeleteDialog()
          setDeleteId(row.original.id)
        }} variant="contained">
                Delete
              </Button>
            </Box>),
      renderTopToolbarCustomActions:()=>{
        return <Button component="label" 
        onClick= {() => openModal({ componenet: AddForm, open: true, headerTitle:"Add New Customer", action:Action.CREATE })}
        sx={{background: 'linear-gradient(105deg, #57BC90 0%, #004B40 100%)'}}
        variant="contained" startIcon={<AddIcon />}>
        ADD NEW CUSTOMER
      </Button>
      },
      muiTableHeadRowProps:{
        sx:{
          backgroundColor:"#57BC90",
          marginBlock:"1rem"
        }
      },
      muiTableProps:{
        sx:{backgroundColor:"#F3F3F3"}
      },
      
      createDisplayMode: 'modal',
      renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => {
        console.log(internalEditComponents)
       return <>
          <DialogTitle sx={{backgroundImage:`url(${MaskImage})`}} variant="h3">Create New User</DialogTitle>
          <DialogContent
            sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
          >
            {internalEditComponents} {/* or render custom edit components here */}
          </DialogContent>
          <DialogActions>
            <MRT_EditActionButtons variant="text" table={table} row={row} />
          </DialogActions>
        </>
      },
      muiEditRowDialogProps:(props)=>{
        console.log(props)
        return {open:true,sx:{ ".MuiDialog-paper":{borderRadius:"20px"}}}
      }
    });
    

  const handleOpenDeleteDialog = () => {
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  const handleDelete = () => {
    // Handle delete logic here
    if(!deleteId) alert("please select user to delete")
    dispatch(removeUser(deleteId))
    handleCloseDeleteDialog();
  };
  return (
    <>
    <Alert
        open={isDeleteDialogOpen}
        handleClose={handleCloseDeleteDialog}
        handleDelete={handleDelete}
      />
    <CustomModal show={modalData.open} />
    <Grid item container xs={12} >
      <Grid item xs={2}>
      <SideNav
        onClose={() => setOpenNav(false)}
        open={openNav}
      />
      </Grid>
      <Grid item xs={10}>
      <Grid sm={12} item container sx={{backgroundColor:"#F3F3F3"}}>
      <Grid item sm={12}>
      <TopNav onNavOpen={() => setOpenNav(true)} />
      </Grid>
      <Grid item sm={12} sx={{display:"flex",justifyContent:"center",marginTop:"5rem"}}>
      <Table tableData={table}/>
      </Grid>
    </Grid>
      </Grid>

    </Grid>
    </>
  )
}

export default App
