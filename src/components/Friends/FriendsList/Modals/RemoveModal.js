import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { theme } from '../../../../theme';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  background: theme.palette.lightGray,
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  textAlign:'center',
  [theme.breakpoints.down(500)]:{
    width:190
  }
};

export default function RemoveModal(props) {

  const handleClose = () => props.setOpen(false);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={props.open.modalNumber===props.index}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >

        <Box sx={style}>

          <Typography
            id="transition-modal-description"
            variant='h6'
            sx={{
              mt: 2,
              color: 'white'
            }}>
            You will remove this user from your friends list.
          </Typography>

          <Box
          sx={{
           textAlign:'center',
           marginTop:'20px'
          }}
          >

            <Button
            variant="contained"
            onClick={()=>{
              props.handleRemove(props._id)
              handleClose()
            }}
            sx={{width:'125px',
            margin:'10px'
          }}
            >Ok 
            <CheckCircleOutlineIcon
            sx={{marginLeft:'15px'}}
            />
            </Button>

            <Button
              variant="outlined"
              onClick={handleClose}
              sx={{
                width:'125px',
                margin:'10px'
              }}
            >Cancell
            
            <HighlightOffIcon
            sx={{marginLeft:'5px'}}
            />
            </Button>


          </Box>


        </Box>




      </Modal>
    </div>
  );
}
