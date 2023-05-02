import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { theme } from '../../../../../theme';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import { baseUrl } from '../../../../..';
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
  [theme.breakpoints.down(550)]:{
    width:'70%',
    height:'auto'
  }
};





export default function DeleteModal(props) {

  const config = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token')
    }
  }
  
  const [deletingPost, setDeletingPost] = React.useState(false)
  const [deletedPost, setDeletedPost] = React.useState(false)
  
  
  
  const handleClose = () => props.setDeleteModal(false);

  const handleDelete = () => {
    setDeletingPost(true)

   // {headers:config.headers, data:{id}  } 

    axios.delete(baseUrl + '/deletePost', {
      headers:config.headers,
      data:{commentsId:props.commentsId}
  }, config).then(
    (res)=>{ setDeletedPost(true)
     setTimeout(()=>{
      setDeletingPost(false)
      setDeletedPost(false)
      handleClose()
      props.setDate(new Date().getTime().toString())
    }, 1500)}
      
    )

  }


  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={props.open}
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
              color: 'white',
              textAlign: 'center',
              height:100,
              [theme.breakpoints.down(400)]:{
                fontSize:'16px',
                m:1,
                pb:0
              },
              [theme.breakpoints.down(300)]:{
              pb:4
              }
            }}>
            You will remove this post from your personal list but it will be still visible at the main wall
          </Typography>



{!deletedPost?<Box
            sx={{
              textAlign: 'center',
              marginTop: '20px'
            }}
          >

            <Button
              variant="contained"
              disabled={deletingPost}
              onClick={() => {
                handleDelete()

              }}
              sx={{
                width: '125px',
                margin: '10px',
                p:1,
                [theme.breakpoints.down(450)]:{
                  width: '100px',
           
                }
              }}
            >Ok
              {!deletingPost ? <CheckCircleOutlineIcon
                sx={{ marginLeft: '15px',  }}
              /> : <CircularProgress size={20} sx={{ml:"9px", color:'white'}} />}
            </Button>



            {!deletingPost ? <Button
              variant="outlined"
              onClick={handleClose}
              sx={{
                width: '125px',
                margin: '10px',
                [theme.breakpoints.down(450)]:{
                  width: '100px'
                }
              }}
            >Cancell

              <HighlightOffIcon
                sx={{ marginLeft: '5px' }}
              />
            </Button> : false}
          </Box>:
          <Typography sx={{color:theme.palette.main_orange, textAlign:'center', fontSize:'20px', mt:1, fontWeight:500}}>

            You have deleted post


          </Typography>
          }
          





        </Box>




      </Modal>
    </div>
  );
}
