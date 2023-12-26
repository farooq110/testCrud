import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Close } from '@mui/icons-material';

const Alert = ({ open, handleClose, handleDelete }:any) => {
  return (
    <Dialog open={open} onClose={handleClose} sx={{ ".MuiDialog-paper":{borderRadius:"20px"} }}>
      {/* <DialogTitle>Confirm Delete</DialogTitle> */}
      <DialogTitle id="id" sx={{fontSize:"40px", textAlign:"center", color:"black"}}>
          <Box display="flex" alignItems="center">
            <Box flexGrow={1}></Box>
            <Box>
              <IconButton onClick={handleClose}>
                <Close sx={{color:"black"}}/>
              </IconButton>
            </Box>
          </Box>
        </DialogTitle>
      <DialogContent sx={{maxWidth:"450px",width:"100%",marginBottom:"1rem"}}>
        <Box sx={{display:"flex",flexDirection:"column", gap:"1rem",alignItems:"center",width:"100%", textAlign:"center"}}>
        <DeleteIcon sx={{fontSize:"70px", color:"red"}}/>
        <Typography sx={{fontSize:"30px", fontWeight:"400"}}>Are you sure?</Typography>
        <Typography sx={{fontSize:"20px"}}>Do you really want to delete this customer? This process can not be undone.</Typography>
        </Box>
        
      </DialogContent>
      <DialogActions sx={{display:"flex",gap:"1rem", justifyContent:"space-evenly",paddingBottom:"4rem",paddingInline:"2rem"}}>
      <Button sx={{color:"white", width:"100%",maxWidth:"210px",backgroundColor:"#A5A5AF", borderRadius:"10px",paddingBlock:".7rem"}} 
    onClick={handleClose}
        variant="contained">
                Cancel
              </Button>
              <Button sx={{color:"white",width:"100%",maxWidth:"210px", backgroundColor:"#D80000",borderRadius:"10px", paddingBlock:".7rem"}} 
              onClick={handleDelete} 
        variant="contained">
                Delete
              </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Alert;
