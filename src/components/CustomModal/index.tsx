import * as React from "react"
import Dialog from "@mui/material/Dialog"
import DialogContent from "@mui/material/DialogContent"
import Close from "@mui/icons-material/Close"
import DialogTitle from "@mui/material/DialogTitle"
import Slide from "@mui/material/Slide"
import { TransitionProps } from "@mui/material/transitions"
import { CustomModalContext } from "../../contexts/CustomModalContext"
import { Box, IconButton } from "@mui/material"
import MaskImage from "../../assets/Mask.png";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function AlertDialogSlide({ show }:any) {
  const { modalData, closeModal } = React.useContext(CustomModalContext)
  const [loading, setLoading] = React.useState(false)

  const handleClose = () => {
    closeModal()
  }

  return (
    <>
      <Dialog
        open={show}
        TransitionComponent={Transition}
        keepMounted
        // onClose={handleClose}
        sx={{ backdropFilter: "blur(0px)", ".MuiDialog-paper":{borderRadius:"20px"} }}
        // aria-describedby="alert-dialog-slide-description"
        // maxWidth={"md"}
      >
        <DialogTitle id="id" sx={{backgroundImage:`url(${MaskImage})`,backgroundRepeat:"no-repeat",fontSize:"40px", textAlign:"center", color:"white"}}>
          {loading?null:<Box display="flex" alignItems="center">
            <Box flexGrow={1}></Box>
            <Box>
              <IconButton onClick={handleClose}>
                <Close sx={{color:"white"}}/>
              </IconButton>
            </Box>
          </Box>}
          {modalData.headerTitle}
        </DialogTitle>
        {/* <DialogTitle>{"Use Google's location service?"}</DialogTitle> */}
        <DialogContent sx={{maxWidth:"528px",width:"100%",height:"400px",padding:0}}>{modalData.componenet && <modalData.componenet setLoading={setLoading} loading={loading} />}</DialogContent>
        {/* <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose}>Agree</Button>
        </DialogActions> */}
      </Dialog>
    </>
  )
}
